"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_1 = require("../lib/supabase");
const gemini_1 = require("../services/ai/gemini");
const router = (0, express_1.Router)();
router.get("/continuity-capsule/:patientId", async (req, res) => {
    try {
        const { patientId } = req.params;
        // 1. Fetch raw records
        const { data: records, error } = await supabase_1.supabaseAdmin
            .from("records")
            .select("*")
            .eq("patient_id", patientId);
        if (error) {
            return res.status(500).json({ error: "Failed to fetch patient records" });
        }
        // 2. Generate AI summary
        const capsule = await (0, gemini_1.generateContinuityCapsule)(records || []);
        res.status(200).json({ success: true, capsule });
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.post("/fraud-score", async (req, res) => {
    try {
        const { prescriptionData } = req.body;
        if (!prescriptionData) {
            return res.status(400).json({ error: "Missing prescription data" });
        }
        const score = await (0, gemini_1.calculateFraudScore)(prescriptionData);
        // n8n Webhook Integration: If fraud risk is high, trigger n8n workflow
        if (score.riskScore > 0.7) {
            const webhookUrl = process.env.N8N_WEBHOOK_URL;
            if (webhookUrl) {
                try {
                    fetch(webhookUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ event: "HIGH_FRAUD_RISK", prescriptionData, score })
                    }).catch(console.error);
                }
                catch (e) {
                    // ignore webhook failure
                }
            }
        }
        res.status(200).json({ success: true, analysis: score });
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = router;

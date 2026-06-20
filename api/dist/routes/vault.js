"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_1 = require("../lib/supabase");
const router = (0, express_1.Router)();
// In a real application, the client uploads directly to Supabase Storage via signed URLs.
// This route is a helper to insert the metadata record into Postgres after upload.
router.post("/metadata", async (req, res) => {
    try {
        const { patientId, recordType, title, storagePath, iv, isEncrypted } = req.body;
        if (!patientId || !title || !storagePath) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const { data, error } = await supabase_1.supabaseAdmin
            .from("records")
            .insert({
            patient_id: patientId,
            record_type: recordType || "other",
            title: title,
            storage_path: storagePath,
            is_encrypted: isEncrypted || false,
            encryption_iv: iv || null,
        })
            .select()
            .single();
        if (error) {
            console.error("Vault metadata insert error:", error);
            return res.status(500).json({ error: "Failed to save record metadata" });
        }
        res.status(200).json({ success: true, record: data });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/:patientId", async (req, res) => {
    try {
        const { patientId } = req.params;
        // We use service_role here for simplicity, but ideally this uses the user's JWT
        // and relies on RLS.
        const { data, error } = await supabase_1.supabaseAdmin
            .from("records")
            .select("*")
            .eq("patient_id", patientId)
            .order("created_at", { ascending: false });
        if (error) {
            return res.status(500).json({ error: "Failed to fetch records" });
        }
        res.status(200).json({ records: data });
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = router;

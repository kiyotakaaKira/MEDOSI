import { Router } from "express";
import { supabaseAdmin } from "../lib/supabase";

const router = Router();

// Hospital/Pharmacy requests access
router.post("/request", async (req, res) => {
  try {
    const { patientId, requesterId, purpose, scope, expiresAt } = req.body;

    if (!patientId || !requesterId || !purpose) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabaseAdmin
      .from("consent_grants")
      .insert({
        patient_id: patientId,
        requester_id: requesterId,
        purpose: purpose,
        scope: scope || ["*"],
        status: "pending",
        expires_at: expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Consent request error:", error);
      return res.status(500).json({ error: "Failed to create consent request" });
    }

    res.status(200).json({ success: true, grant: data });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Patient approves or denies
router.post("/:id/decide", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "approved" or "denied"

    if (!["approved", "denied"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const { data, error } = await supabaseAdmin
      .from("consent_grants")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Consent decision error:", error);
      return res.status(500).json({ error: "Failed to update consent" });
    }

    res.status(200).json({ success: true, grant: data });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Patient or system revokes active grant
router.post("/:id/revoke", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from("consent_grants")
      .update({ status: "revoked" })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Failed to revoke consent" });
    }

    res.status(200).json({ success: true, grant: data });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Emergency Break-Glass
router.post("/break-glass", async (req, res) => {
  try {
    const { patientId, hospitalId, reason } = req.body;

    const { data, error } = await supabaseAdmin
      .from("consent_grants")
      .insert({
        patient_id: patientId,
        requester_id: hospitalId,
        purpose: `EMERGENCY OVERRIDE: ${reason}`,
        scope: ["*"],
        status: "approved",
        expires_at: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Failed to declare emergency" });
    }

    await supabaseAdmin.from("audit_logs").insert({
      patient_id: patientId,
      actor_id: hospitalId,
      action: "emergency_override",
      details: reason,
    });

    res.status(200).json({ success: true, grant: data });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Internal endpoint called by n8n cron workflow
router.post("/internal/grant-expired", async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("consent_grants")
      .update({ status: "expired" })
      .lt("expires_at", new Date().toISOString())
      .eq("status", "approved");

    if (error) {
      return res.status(500).json({ error: "Failed to expire grants" });
    }

    res.status(200).json({ success: true, message: "Expired grants processed." });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

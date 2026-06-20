import { Router } from "express";
import { supabaseAdmin } from "../lib/supabase";

const router = Router();

router.get("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;

    const { data, error } = await supabaseAdmin
      .from("audit_logs")
      .select("*")
      .eq("patient_id", patientId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Audit fetch error:", error);
      return res.status(500).json({ error: "Failed to fetch audit logs" });
    }

    res.status(200).json({ logs: data });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

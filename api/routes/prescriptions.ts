import { Router } from "express";
import { supabaseAdmin } from "../lib/supabase";
import { signPrescription, verifyPrescriptionToken } from "../services/crypto/qr";

const router = Router();

// Doctor issues a prescription -> Generates QR Token
router.post("/issue", async (req, res) => {
  try {
    const { patientId, doctorId, medication, dosage } = req.body;

    if (!patientId || !doctorId || !medication) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data: record, error } = await supabaseAdmin
      .from("prescriptions")
      .insert({
        patient_id: patientId,
        doctor_id: doctorId,
        medication: medication,
        dosage: dosage,
        status: "active",
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Failed to issue prescription" });
    }

    // Generate cryptographic QR token
    const qrToken = signPrescription({
      prescriptionId: record.id,
      patientId,
      doctorId,
      medication,
      dosage,
      issuedAt: record.created_at,
    });

    res.status(200).json({ success: true, prescription: record, qrToken });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Pharmacy verifies the QR token
router.get("/verify/:qr", async (req, res) => {
  try {
    const { qr } = req.params;
    
    const verification = verifyPrescriptionToken(qr);
    
    if (!verification.valid) {
      return res.status(400).json({ status: "Fraudulent", reason: verification.reason });
    }

    // Check DB status to ensure it hasn't been dispensed already
    const { data: record, error } = await supabaseAdmin
      .from("prescriptions")
      .select("status")
      .eq("id", verification.payload!.prescriptionId)
      .single();

    if (error || !record) {
      return res.status(404).json({ status: "Suspicious", reason: "Prescription not found in registry" });
    }

    if (record.status === "dispensed") {
      return res.status(400).json({ status: "Suspicious", reason: "Already dispensed" });
    }

    res.status(200).json({ status: "Verified", payload: verification.payload });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Pharmacy dispenses the medication
router.post("/dispense", async (req, res) => {
  try {
    const { prescriptionId, pharmacyId } = req.body;

    const { data, error } = await supabaseAdmin
      .from("prescriptions")
      .update({ status: "dispensed", pharmacy_id: pharmacyId })
      .eq("id", prescriptionId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Failed to dispense prescription" });
    }

    res.status(200).json({ success: true, prescription: data });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

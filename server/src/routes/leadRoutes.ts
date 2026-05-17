import express from "express";

import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLead,
} from "../controllers/leadController";

import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// Create Lead
router.post("/", authMiddleware, createLead);

// Get All Leads
router.get("/", authMiddleware, getLeads);

// Get Single Lead
router.get("/:id", authMiddleware, getLeadById);

// Update Lead
router.put("/:id", authMiddleware, updateLead);

// Delete Lead
router.delete("/:id", authMiddleware, deleteLead);

export default router;
import { Request, Response } from "express";
import Lead from "../models/Lead";
import { AuthRequest } from "../middleware/authMiddleware";

// Create Lead
export const createLead = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json({
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

// Get All Leads
export const getLeads = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      status,
      source,
      search,
      sort = "latest",
      page = "1",
      limit = "10",
    } = req.query;

    // Filters
    const filters: any = { userId: req.user.id };

    if (status) {
      filters.status = status;
    }

    if (source) {
      filters.source = source;
    }

    // Search
    if (search) {
      filters.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Sorting
    const sortOption: any =
      sort === "oldest"
        ? { createdAt: 1 }
        : { createdAt: -1 };

    // Pagination
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const skip =
      (pageNumber - 1) * limitNumber;

    // Fetch Leads
    const leads = await Lead.find(filters)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    // Total Count
    const total = await Lead.countDocuments(
      filters
    );

    res.status(200).json({
      total,
      currentPage: pageNumber,
      totalPages: Math.ceil(
        total / limitNumber
      ),
      leads,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

// Get Single Lead
export const getLeadById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

// Update Lead
export const updateLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }

    res.status(200).json({
      message: "Lead updated successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

// Delete Lead
export const deleteLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }

    res.status(200).json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};
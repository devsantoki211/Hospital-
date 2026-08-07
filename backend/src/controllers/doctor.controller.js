import Doctor from "../models/doctor.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const createProfile = asyncHandler(async (req, res) => {
    const { specialization, experienceYears, consultationFee } = req.body;

    const existingProfile = await Doctor.findOne({ user: req.user._id });
    if (existingProfile) {
        throw new ApiError(400, "Doctor profile already exists");
    }

    const doctor = await Doctor.create({
        user: req.user._id,
        specialization, experienceYears, consultationFee
    });

    res.status(201).json(new ApiResponse(201, doctor, "Doctor profile created successfully"));
});

export const getAllDoctors = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({ isAvailable: true }).populate("user", "username email");
    res.status(200).json(new ApiResponse(200, doctors, "Doctors fetched successfully"));
});
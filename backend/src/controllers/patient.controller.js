import Patient from "../models/patient.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const createProfile = asyncHandler(async (req, res) => {
    const { age, gender, bloodGroup, medicalHistory, contactPhone } = req.body;

    const existingProfile = await Patient.findOne({ user: req.user._id });
    if (existingProfile) {
        throw new ApiError(400, "Patient profile already exists");
    }

    const patient = await Patient.create({
        user: req.user._id,
        age, gender, bloodGroup, medicalHistory, contactPhone
    });

    res.status(201).json(new ApiResponse(201, patient, "Patient profile created successfully"));
});

export const getMyProfile = asyncHandler(async (req, res) => {
    const patient = await Patient.findOne({ user: req.user._id }).populate("user", "username email");
    
    if (!patient) {
        throw new ApiError(404, "Patient profile not found");
    }

    res.status(200).json(new ApiResponse(200, patient, "Profile fetched successfully"));
});
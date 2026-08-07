import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getAdminDashboardStats = asyncHandler(async (req, res) => {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: "PENDING" });

    res.status(200).json(new ApiResponse(200, {
        totalPatients,
        totalDoctors,
        totalAppointments,
        pendingAppointments
    }, "Dashboard stats fetched successfully"));
});
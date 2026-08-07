import Appointment from "../models/appointment.model.js";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const bookAppointment = asyncHandler(async (req, res) => {
    const { doctorId, appointmentDate, notes } = req.body;

    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient) throw new ApiError(404, "Please complete your patient profile first");

    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.isAvailable) throw new ApiError(404, "Doctor not found or unavailable");

    const appointment = await Appointment.create({
        patient: patient._id,
        doctor: doctor._id,
        appointmentDate,
        notes
    });

    res.status(201).json(new ApiResponse(201, appointment, "Appointment booked successfully"));
});

export const getMyPatientAppointments = asyncHandler(async (req, res) => {
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient) throw new ApiError(404, "Patient profile not found");

    const appointments = await Appointment.find({ patient: patient._id })
        .populate({ path: "doctor", populate: { path: "user", select: "username email" } });

    res.status(200).json(new ApiResponse(200, appointments, "Appointments fetched"));
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;
    const { status } = req.body; // CONFIRMED, COMPLETED, CANCELLED

    const appointment = await Appointment.findByIdAndUpdate(
        appointmentId, 
        { status }, 
        { new: true }
    );

    if (!appointment) throw new ApiError(404, "Appointment not found");

    res.status(200).json(new ApiResponse(200, appointment, `Appointment ${status}`));
});
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"],
        default: "PENDING"
    },
    notes: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);
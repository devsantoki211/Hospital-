import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experienceYears: {
        type: Number,
        required: true
    },
    consultationFee: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model("Doctor", doctorSchema);
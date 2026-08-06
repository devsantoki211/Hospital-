import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    bloodGroup: {
        type: String
    },
    medicalHistory: [{
        type: String
    }],
    contactPhone: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Patient", patientSchema);
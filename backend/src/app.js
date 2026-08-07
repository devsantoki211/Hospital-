import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Route Imports
import authRouter from './routes/auth.routes.js';
import patientRouter from './routes/patient.routes.js';
import doctorRouter from './routes/doctor.routes.js';
import appointmentRouter from './routes/appointment.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Mount Routes
app.use("/api/auth", authRouter);
app.use("/api/patients", patientRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/dashboard", dashboardRouter);

// Global Error Handling Middleware (Catches ApiError throws)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    });
});

export default app;
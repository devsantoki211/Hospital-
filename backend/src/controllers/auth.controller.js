import userModel from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";

// ======================= REGISTER =======================
export async function register(req, res) {
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isAlreadyRegistered) {
        return res.status(409).json({
            message: "Username or email already exists"
        });
    }

    const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        verified: true
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

// ======================= LOGIN =======================
export async function login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    if (hashedPassword !== user.password) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const refreshToken = jwt.sign(
        { id: user._id },
        config.JWT_SECRET,
        { expiresIn: "7d" }
    );

    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    });

    const accessToken = jwt.sign(
        {
            id: user._id,
            sessionId: session._id
        },
        config.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "Logged in successfully",
        accessToken,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

// ======================= GET ME =======================
export async function getMe(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token not found"
        });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        message: "User fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

// ======================= REFRESH TOKEN =======================
export async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token not found"
        });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    });

    if (!session) {
        return res.status(401).json({
            message: "Invalid refresh token"
        });
    }

    const accessToken = jwt.sign(
        {
            id: decoded.id,
            sessionId: session._id
        },
        config.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );

    res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken
    });
}

// ======================= LOGOUT =======================
export async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({
            message: "Refresh token not found"
        });
    }

    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    await sessionModel.findOneAndUpdate(
        { refreshTokenHash },
        { revoked: true }
    );

    res.clearCookie("refreshToken");

    res.status(200).json({
        message: "Logged out successfully"
    });
}

// ======================= LOGOUT ALL =======================
export async function logoutAll(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({
            message: "Refresh token not found"
        });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

    await sessionModel.updateMany(
        { user: decoded.id },
        { revoked: true }
    );

    res.clearCookie("refreshToken");

    res.status(200).json({
        message: "Logged out from all devices successfully"
    });
}
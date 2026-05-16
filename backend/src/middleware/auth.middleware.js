import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authUser(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized, no token provided",
            success: false
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Unauthorized, invalid token",
            success: false,
            error: error.message
        });
    }
}  

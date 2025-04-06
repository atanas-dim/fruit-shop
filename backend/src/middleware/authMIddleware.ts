import { Request, Response, NextFunction } from "express";

const JWT_SECRET_KEY = process.env.ACCESS_TOKEN || "";

// Basic token comparison middleware
const checkAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    if (token !== JWT_SECRET_KEY) {
      throw new Error("Invalid token");
    }

    next();
  } catch (error: any) {
    console.error("Authorization error:", error);
    res.status(401).json({ message: error.message });
  }
};

export default checkAuthToken;

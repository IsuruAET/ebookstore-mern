import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/User";

interface JwtPayload {
  id: string;
}

declare module "express" {
  interface Request {
    user?: IUser;
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Please authenticate." });
  }
};

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return await auth(req, res, () => {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Access denied. Admin only." });
      }
      return next();
    });
  } catch (error) {
    return res.status(401).json({ error: "Please authenticate." });
  }
};

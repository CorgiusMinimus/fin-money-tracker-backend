import { NextFunction, Request, Response } from "express";
import { verifySessionService } from "../services/auth.service";
import { Session, SessionUser } from "../types/auth.types";

export const validateSession = async (req: Request, res: Response, next: NextFunction) => {
    const session = req.cookies.session

    if(!session) {
        res.status(401).json({
            success: true,
            data: null,
            message: "Authentication required."
        })

        return
    }

    const result = await verifySessionService(session)

    if(!result.success || !result.data){
        res.clearCookie('session')
        res.status(401).json({
            success: false,
            data: null,
            message: "Session expired or invalid."
        })
    }   

    req.session = result.data
    next()
}

declare global {
    namespace Express {
        interface Request {
            session: SessionUser
        }
    }
}
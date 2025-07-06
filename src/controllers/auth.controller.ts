import { Request, Response } from "express";
import { registerUserService } from "../services/users.service";
import { deleteSessionService, loginService } from "../services/auth.service";

export const registerUserController = async (req: Request, res: Response) => {
    const {
        email,
        firstName,
        lastName,
        password
    } = req.body

    const result = await registerUserService({email, firstName, lastName, password})

    if(!result.success) {
        res.status(result.error.code || 500).json({
            success: false,
            data: {},
            message: result.error.message || "Unknown error."
        })

        return
    }

    res.status(201).json({
        success: true,
        data: result.data,
        message: "Successfully registered."
    })
}

export const loginUserController = async (req: Request, res: Response) => {
    const {
        email, 
        password
    } = req.body

    const result = await loginService(email, password)

    if(!result.success){
        res.status(result.error.code || 500).json({
            success: false,
            data: null,
            message: result.error.message || "Unknown error."
        })

        return
    }

    res.cookie('session', result.data.token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        success: true,
        data: null,
        message: "Login successful."
    })
}

export const logoutSessionController = async (req: Request, res: Response) => {
    const session = req.cookies.session

    const result = await deleteSessionService(session)

    if(!result.success){
        res.status(500).json({
            success: false,
            data: null,
            message: "Logout failed."
        })

        return
    }

    res.clearCookie('session')

    res.status(200).json({
        success: true,
        data: null,
        message: "Logout successful."
    })

}
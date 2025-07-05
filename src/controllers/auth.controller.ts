import { Request, Response } from "express";
import { registerUserService } from "../services/users.service";

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
    }

    res.status(201).json({
        success: true,
        data: result.data,
        message: "Successfully registered."
    })
}
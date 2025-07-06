import { Request, Response } from "express";
import { getAccountsService } from "../services/accounts.service";

export const getAccountsController = async (req: Request, res: Response) => {
    
    const userId = req.session.user.user_id
    
    const result = await getAccountsService(userId)

    if(!result.success){
        res.status(result.error.code || 500).json({
            success: false,
            data: null,
            message: result.error.message || "Unknown error."
        })

        return
    }

    res.status(200).json({
        success: true,
        data: result.data,
        message: "List of user's accounts."
    })
}
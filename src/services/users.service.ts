import { register } from "../repositories/users.repository"
import { ServiceResult } from "../types/generics.types"

export const registerUserService = async (
    data: {
        email: string,
        firstName: string,
        lastName: string,
        password: string
    } 
): Promise<ServiceResult<any>> => {
    const result = await register(data)

    if(!result.success){
        return {
            success: false,
            data: {},
            error: {
                message: result.error.message
            }
        }
    }

    return {
        success: true,
        data: result.data
    }
}
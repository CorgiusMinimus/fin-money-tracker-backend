import { ServiceResult } from "../types/generics.types"
import { prisma } from "../utils/prisma"
import { hashPassword } from "../utils/scrypt"

export const register = async (
    data: {
        email: string,
        firstName: string,
        lastName: string,
        password: string
    }
): Promise<ServiceResult<any>> => {
    try {   
        const hash = hashPassword(data.password)
        const result = await prisma.user.create({
            data: {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                password: hash
            }
        })

        return {
            success: true,
            data: result
        }
    }

    catch(err: unknown) {
        return {
            success: false,
            data: {},
            error: {
                message: (err as Error).message
            }
        }
    }
}
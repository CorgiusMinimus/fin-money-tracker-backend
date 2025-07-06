import { ServiceResult } from "../types/generics.types"
import { User } from "../types/users.types"
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

export const findUserEmail = async (email: string): Promise<ServiceResult<User>> => {
    try {
        const result = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                user_id: true,
                first_name: true,
                last_name: true,
                password: true,
                created_at: true,
                email: true,
                
            }
        })

        if(!result) {
            throw new Error("No user found.")
        }

        return {
            success: true,
            data: result
        }
    }

    catch (err: unknown){
        return {
            success: false,
            data: null,
            error: {
                message: (err as Error).message
            }
        }
    }
}
import { Session } from "../types/auth.types"
import { ServiceResult } from "../types/generics.types"
import { prisma } from "../utils/prisma"

export const insertSession = async (id: string, hash: string): Promise<ServiceResult<any>> => {
    try {
        const result = await prisma.session.create({
            data: {
                user_id: id,
                session_hash: hash
            }
        })

        return {
            success: true,
            data: {
                token: hash
            }
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

export const findSession = async (hash: string): Promise<ServiceResult<Session>> => {
    try {
        const result = await prisma.session.findFirst({
            where: {
                session_hash: hash
            },
            include: {
                user: true
            }
        })

        if(!result){
            return {
                success: false,
                data: null
            }
        }
        
        return {
            success: true,
            data: result
        }
    }

    catch(err: unknown) {
        return {
            success: false,
            data: null,
            error: {
                message: (err as Error).message
            }
        }
    }
}

export const deleteSession = async (hash: string): Promise<ServiceResult<null>> => {
    try {
        const result = await prisma.session.deleteMany({
            where: {
                session_hash: hash
            }
        })

        return {
            success: true,
            data: null
        }
    }

    catch(err: unknown) {
         return {
            success: false,
            data: null,
            error: {
                message: (err as Error).message
            }
        }
    }
}

export const deleteUserSessions = async (user: string): Promise<ServiceResult<null>> => {
    try {
        const result = await prisma.session.deleteMany({
            where: {
                user_id: user
            }
        })

        return {
            success: true,
            data: null
        }
    }

    catch(err: unknown) {
         return {
            success: false,
            data: null,
            error: {
                message: (err as Error).message
            }
        }
    }
}
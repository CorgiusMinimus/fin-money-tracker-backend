import { Account } from "../types/accounts.types";
import { ServiceResult } from "../types/generics.types";
import { prisma } from "../utils/prisma";

export const getAccounts = async (user: string): Promise<ServiceResult<Account[]>> => {
    try {
        const result = await prisma.account.findMany({
            where: {
                user_id: user
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
            data: null,
            error: {
                message: (err as Error).message
            }
        }
    }
}

export const addAccount = async (
    user: string,
    data: {
        accountName: string,
        accountType: number,
        colorId: number,
        balance?: number
    }
): Promise<ServiceResult<Account>> => {
    try {
        const result = await prisma.account.create({
            data: {
                account_name: data.accountName,
                account_type_id: data.accountType,
                color_id: data.colorId,
                user_id: user,
                balance: data.balance || undefined
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
            data: null,
            error: {
                message: (err as Error).message
            }
        }
    }
}
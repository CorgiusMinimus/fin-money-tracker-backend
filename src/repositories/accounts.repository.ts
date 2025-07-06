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
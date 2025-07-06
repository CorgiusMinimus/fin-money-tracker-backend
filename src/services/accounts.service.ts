import { addAccount, getAccounts } from "../repositories/accounts.repository";
import { Account } from "../types/accounts.types";
import { ServiceResult } from "../types/generics.types";
import { logError, logInfo } from "../utils/winston";

const moduleName = 'Accounts'

export const getAccountsService = async (user: string): Promise<ServiceResult<Account[]>> => {
    logInfo(200, moduleName, 'Service accessed.', { user_id: user})
    const result = await getAccounts(user)
    
    if(!result.success){
        logError(500, moduleName, result.error.message)
        return {
            success: false,
            data: null,
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

export const addAccountService = async (
    user: string, 
    data: {
        accountName: string,
        accountType: number,
        colorId: number,
        balance?: number
    }
): Promise<ServiceResult<Account>> => {
    logInfo(200, moduleName, 'Adding account...', { userId: user})

    const result = await addAccount(user, data)

    if(!result.success){
        return {
            success: false,
            data: null,
            error: {
                message: result.error.message || "Unknown error."
            }
        }
    }

    return {
        success: true,
        data: result.data
    }
}
import { addAccount, editAccount, getAccounts } from "../repositories/accounts.repository";
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
        logError(500, moduleName, result.error.message)
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

export const editAccountService = async (
    account_id: string,
    user_id: string,
    data: {
        accountName?: string,
        accountType?: number,
        colorId?: number,
        balance?: number
    }
): Promise<ServiceResult<Account>> => {
    logInfo(200, moduleName, 'Editing account...', { userId: user_id})

    const accounts = await getAccounts(user_id)

    if(accounts.data.filter((account) => account.user_id === user_id).length < 1) {
        return {
            success: false,
            data: null,
            error: {
                message: `Account not found for user.`,
                code: 404
            }
        }
    }

    const result = await editAccount(account_id, data)

    if(!result.success){
        logError(500, moduleName, result.error.message)
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
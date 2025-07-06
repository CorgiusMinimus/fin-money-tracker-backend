import { getAccounts } from "../repositories/accounts.repository";
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
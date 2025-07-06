import { Decimal } from "@prisma/client/runtime/library"

export interface Account {
    account_id: string,
    user_id: string,
    account_name: string,
    account_type_id: number,            
    balance: Decimal,
    color_id: number
    created_at: Date,
    updated_at?: Date

}
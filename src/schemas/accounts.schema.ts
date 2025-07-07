import { ZodObject, z } from "zod";

export const addAccountSchema = z.object({
    accountName: z.string(),
    accountType: z.coerce.number(),
    colorId: z.coerce.number(),
    balance: z.coerce.number().optional()
})

export const editAccountSchema = z.object({
    accountName: z.string().optional(),
    accountType: z.coerce.number().optional(),
    colorId: z.coerce.number().optional(),
    balance: z.coerce.number().optional()
})
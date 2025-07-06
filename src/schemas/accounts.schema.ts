import { ZodObject, z } from "zod";

export const addAccountSchema = z.object({
    accountName: z.string(),
    accountType: z.coerce.number(),
    colorId: z.coerce.number(),
    balance: z.coerce.number().optional()
})
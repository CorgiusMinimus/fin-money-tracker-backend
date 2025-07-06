import { deleteSession, findSession, insertSession } from "../repositories/auth.repository";
import { ServiceResult } from "../types/generics.types";
import { hashSecret } from "../utils/auth";

export const generateSecureString = () => {
    // Human readable alphabet (a-z, 0-9 without l, o, 0, 1 to avoid confusion)
	const alphabet = "abcdefghijklmnpqrstuvwxyz23456789";

	// Generate 24 bytes = 192 bits of entropy.
	// We're only going to use 5 bits per byte so the total entropy will be 192 * 5 / 8 = 120 bits
	const bytes = new Uint8Array(24);
	crypto.getRandomValues(bytes);

	let id = "";
	for (let i = 0; i < bytes.length; i++) {
		// >> 3 s"removes" the right-most 3 bits of the byte
		id += alphabet[bytes[i] >> 3];
	}
	return id;
}

export const insertSessionService = async (user: string): Promise<ServiceResult<any>> => {
    const now = new Date()
    const secret = generateSecureString()
    const hash = hashSecret(secret)

    const result = await insertSession(user, hash)

    if(!result.success){
        return {
            success: false,
            data: {},
            error: {
                message: result.error.message
            }
        }
    }

    return {
        success: true,
        data: {
            token: secret
        }
    }
}

export const verifySessionService = async (token: string): Promise<ServiceResult<boolean>> => {
    const sessionHash = hashSecret(token)
    const find = await findSession(sessionHash)

    if(!find.success){
        return {
            success: false,
            data: null
        }
    }
    
    return {
        success: true,
        data: true
    }
}

export const deleteSessionService = async (token: string): Promise<ServiceResult<null>> => {
    const sessionHash = hashSecret(token)
    const result = await deleteSession(sessionHash)

    if(!result.success){
        return {
            success: false,
            data: null
        }
    }

    return {
        success: true,
        data: null
    }
}
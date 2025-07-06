import { deleteSession, findSession, insertSession } from "../repositories/auth.repository";
import { findUserEmail } from "../repositories/users.repository";
import { Session, SessionToken, SessionUser } from "../types/auth.types";
import { ServiceResult } from "../types/generics.types";
import { User } from "../types/users.types";
import { hashSecret } from "../utils/auth";
import { comparePassword } from "../utils/scrypt";

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

export const insertSessionService = async (user: string): Promise<ServiceResult<SessionToken>> => {
    const now = new Date()
    const secret = generateSecureString()
    const hash = hashSecret(secret)

    const result = await insertSession(user, hash)

    if(!result.success){
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
        data: {
            session: result.data,
            token: secret
        }
    }
}

export const verifySessionService = async (token: string): Promise<ServiceResult<SessionUser>> => {
    const sessionHash = hashSecret(token)
    const find = await findSession(sessionHash)

    if(!find.success){
        return {
            success: false,
            data: null
        }
    }

    if(find.data.expires_at < new Date()){
        return {
            success: false,
            data: null,
            error: {
                message: "Session expired."
            }
        }
    }

    const obj: SessionUser = {
        session: {
            session_id: find.data.session_id,
            created_at: find.data.created_at
        },
        user: {
            user_id: find.data.user.user_id,
            email: find.data.user.email
        }
    }
    
    return {
        success: true,
        data: obj
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

export const loginService = async (email: string, password: string): Promise<ServiceResult<SessionToken>> => {
    const user = await findUserEmail(email)

    if(!user.success || !user) {
        return {
            success: false,
            data: null,
            error: {
                code: 404,
                message: "User not found."
            }
        }
    }

    const verifyPassword = await comparePassword(password, user.data.password)

    if(!verifyPassword) {
        return {
            success: false,
            data: null,
            error: {
                code: 401,
                message: "Invalid credentials."
            }
        }
    }

    const session = await insertSessionService(user.data.user_id)

    if(!session.success){
        return {
            success: false,
            data: null,
            error: {
                message: session.error.message || "Unknown error."
            }
        }
    }

    return {
        success: true,
        data: {
            session: session.data.session,
            token: session.data.token
        }
    }
}
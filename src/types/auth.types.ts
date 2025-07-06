import { User } from "./users.types";

export interface Session {
    session_id: string;
    user_id: string;
    session_hash: string;
    created_at: Date;
    expires_at: Date;
    user: User;
}

export interface SessionUser {
    session: {
        session_id: string,
        created_at: Date
    },
    user: {
        user_id: string;
        email: string;
    }
}

export interface SessionToken {
    session: Session,
    token: string
}
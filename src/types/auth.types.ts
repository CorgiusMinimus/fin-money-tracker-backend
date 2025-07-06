import { User } from "./users.types";

export interface Session {
    session_id: string;
    user_id: string;
    session_hash: string;
    created_at: Date;
    user: User;
}
import pool from "../config/db";
import { QueryResult } from 'pg';

// Interface para o modelo User
interface User {
    id: number;
    name: string;
    email: string;
    created_at?: Date;
}

interface DeleteAllResponse {
    count: number;
    users: User[];
}

export const getAllUsersService = async (): Promise<User[]> => {
    const result: QueryResult<User> = await pool.query("SELECT * FROM users");
    return result.rows;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
    const result: QueryResult<User> = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] || null;
};

export const createUserService = async (name: string, email: string): Promise<User> => {
    const result: QueryResult<User> = await pool.query(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        [name, email]
    );
    return result.rows[0];
};

export const updateUserService = async (id: number, name: string, email: string): Promise<User | null> => {
    const result: QueryResult<User> = await pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
        [name, email, id]
    );
    return result.rows[0] || null;
};

export const deleteUserService = async (id: number): Promise<User | null> => {
    const result: QueryResult<User> = await pool.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0] || null;
};

export const deleteUserAllService = async (): Promise<DeleteAllResponse> => {
    if (process.env.NODE_ENV === 'production') {
        throw new Error("Operation not allowed in production");
    }

    const result: QueryResult<User> = await pool.query("DELETE FROM users RETURNING *");
    return {
        count: result.rowCount || 0,
        users: result.rows || []
    };
};
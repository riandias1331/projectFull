import { Request, Response } from 'express';
import {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
    deleteUserAllService
} from '../models/model.postgres';
import jwt from 'jsonwebtoken';

// Definindo tipos para melhor organização
interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
}

interface DeleteAllResponse {
    count: number;
    users?: User[];
}

interface ApiResponse<T = any> {
    status: number;
    message: string;
    data?: T;
}

// Função auxiliar com tipagem
const handleResponse = <T>(res: Response, status: number, message: string, data?: T, token?: string): void => {
    const response: ApiResponse<T> & { token?: string } = {
        status,
        message,
        data,
        ...(token && { token })
    };
    res.status(status).json(response);
}

export const createUser = async (req: Request, res: Response): Promise<void> => {

    try {
        const { name, email, password } = req.body as User;

        if (!name || !email || !password) {
            handleResponse(res, 400, 'Name and email are required');
            return;
        }
        const user = await createUserService(name, email, password);
        // Gera o token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        
        console.log('token:', token, user);
        console.log('User created', 'token:', token, user);
        handleResponse<User>(res, 201, 'User created successfully', user, token);
    } catch (error) {
        console.error('Error in createUser:', error);
        handleResponse(res, 500, 'Error creating user');
    }
}

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getAllUsersService();
        handleResponse<User[]>(res, 200, 'Users fetched successfully', users);
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        handleResponse(res, 500, 'Error fetching users');
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const user = await getUserByIdService(parseInt(id));
        if (!user) {
            handleResponse(res, 404, 'User not found');
            return;
        }
        handleResponse<User>(res, 200, 'User fetched successfully', user);
    } catch (error) {
        console.error('Error in getUserById:', error);
        handleResponse(res, 500, 'Error fetching user');
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body as User;


        const updatedUser = await updateUserService(parseInt(id), name, email, password);
        if (!updatedUser) {
            handleResponse(res, 404, 'User not found');
            return;
        }
        handleResponse<User>(res, 200, 'User updated successfully', updatedUser);
    } catch (error) {
        console.error('Error in updateUser:', error);
        handleResponse(res, 500, 'Error updating user');
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUserService(parseInt(id));
        if (!deletedUser) {
            handleResponse(res, 404, 'User not found');
            return;
        }
        handleResponse<User>(res, 200, 'User deleted successfully', deletedUser);
    } catch (error) {
        console.error('Error in deleteUser:', error);
        handleResponse(res, 500, 'Error deleting user');
    }
}

export const deleteAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleted = await deleteUserAllService();

        // Verificação mais segura da estrutura de retorno
        if (!deleted || typeof deleted.count !== 'number') {
            handleResponse(res, 500, 'Invalid response from delete operation');
            return;
        }

        if (deleted.count === 0) {
            handleResponse(res, 404, 'No users found to delete');
            return;
        }

        console.log('All users deleted:', deleted.count);
        handleResponse<{ deletedCount: number, deletedUsers?: User[] }>(
            res,
            200,
            `All users (${deleted.count}) were deleted successfully`,
            {
                deletedCount: deleted.count,
                deletedUsers: deleted.users
            }
        );
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "Operation not allowed in production") {
            handleResponse(res, 403, error.message);
            return;
        }

        console.error('Error in deleteAll:', error);
        handleResponse(res, 500, 'Error deleting all users');
    }
}
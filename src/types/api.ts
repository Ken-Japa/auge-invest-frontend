import { User,UserSettings } from './user';

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
    };
}

export interface UserRegistrationData {
    name: string;
    email: string;
    phone?: string;
    cpf: string;
    password: string;
}

export interface UserLoginData {
    email: string;
    password: string;
}

// Define UserPreferences type based on the User interface
type UserPreferences = User['preferences'];

export type UserUpdateData = Partial<Omit<UserRegistrationData, 'password'>> & {
    settings?: Partial<UserSettings>;
    preferences?: Partial<UserPreferences>;
};
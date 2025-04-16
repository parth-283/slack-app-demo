import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (username: string, password: string): Promise<{ success: boolean; user?: any; message?: string }> => {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            params: {
                username,
                password
            }
        });

        if (response.data.length > 0) {
            return {
                success: true,
                user: response.data[0],
            };
        } else {
            return {
                success: false,
                message: 'Invalid credentials',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Server error',
        };
    }
};

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getConversation = async (): Promise<{ success: boolean; list?: any; message?: string }> => {
    try {
        const response = await axios.get(`${API_URL}/conversations`,);

        return {
            success: true,
            list: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Server error',
        };
    }
};

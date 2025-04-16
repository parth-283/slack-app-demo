import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getConversation = async (): Promise<{ success: boolean; list?: any; message?: string }> => {
    try {
        const response = await axios.get(`${API_URL}/conversations`);

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

export const getActiveConversation = async (id: string): Promise<{
    success: boolean; conversation?: {
        id: number;
        name: string;
    }; message?: string
}> => {
    try {
        const response = await axios.get(`${API_URL}/conversations`, {
            params: {
                id
            }
        });

        return {
            success: true,
            conversation: response.data[0],
        };
    } catch (error) {
        return {
            success: false,
            message: 'Server error',
        };
    }
};

export const getMessagesByConversation = async (id: string): Promise<{
    success: boolean; messages?: Array<{
        id: string;
        conversationId: string;
        sender: string;
        content: string;
        timestamp: string;
    }>; message?: string
}> => {
    try {
        const response = await axios.get(`${API_URL}/messages`, {
            params: {
                conversationId: id
            }
        });

        return {
            success: true,
            messages: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Server error',
        };
    }
};

import { getActiveConversation, getConversation, getMessagesByConversation, sendMassage } from './../../services/chatService';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface Message {
    conversationId: string;
    sender: string;
    content: string;
    timestamp: string;
}

export const getConversationThunk = createAsyncThunk(
    'fetch/conversation',
    async (_, thunkAPI) => {
        const res = await getConversation();
        if (res.success) {
            return res;
        } else {
            return thunkAPI.rejectWithValue(res.message);
        }
    }
);

export const getActiveConversationThunk = createAsyncThunk(
    'fetch/activeConversation',
    async (id: string, thunkAPI) => {
        const res = await getActiveConversation(id);
        if (res.success) {
            return res;
        } else {
            return thunkAPI.rejectWithValue(res.message);
        }
    }
);

export const getMessagesByConversationThunk = createAsyncThunk(
    'fetch/messagesByConversation',
    async (id: string, thunkAPI) => {
        const res = await getMessagesByConversation(id);
        if (res.success) {
            return res;
        } else {
            return thunkAPI.rejectWithValue(res.message);
        }
    }
);

export const sendMessageThunk = createAsyncThunk(
    'send/messages',
    async (data: Message, thunkAPI) => {
        const res = await sendMassage(data);
        if (res.success) {
            return res;
        } else {
            return thunkAPI.rejectWithValue(res.message);
        }
    }
);

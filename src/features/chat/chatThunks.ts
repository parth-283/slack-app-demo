import { getActiveConversation, getConversation, getMessagesByConversation } from './../../services/chatService';
import { createAsyncThunk } from '@reduxjs/toolkit';

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

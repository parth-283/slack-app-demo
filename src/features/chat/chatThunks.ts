import { getConversation } from './../../services/chatService';
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

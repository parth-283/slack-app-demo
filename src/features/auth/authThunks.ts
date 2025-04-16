import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../services/authService';

export const loginThunk = createAsyncThunk(
    'auth/login',
    async ({ username, password }: { username: string; password: string }, thunkAPI) => {
        const res = await login(username, password);
        if (res.success) {
            return res.user;
        } else {
            return thunkAPI.rejectWithValue(res.message);
        }
    }
);

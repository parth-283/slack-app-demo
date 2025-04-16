import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getConversationThunk } from "./chatThunks";

interface Message {
  id: number;
  conversationId: number;
  sender: string;
  content: string;
}

interface Conversation {
  id: number;
  name: string;
}

interface ChatState {
  activeConversationId: number | null;
  drafts: Record<number, string>;
  messages: Message[];
  conversation: Conversation[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  activeConversationId: null,
  drafts: {},
  messages: [],
  conversation: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action: PayloadAction<number>) => {
      state.activeConversationId = action.payload;
    },
    saveDraft: (state, action: PayloadAction<{ conversationId: number; draft: string }>) => {
      state.drafts[action.payload.conversationId] = action.payload.draft;
    },
    clearDraft: (state, action: PayloadAction<number>) => {
      delete state.drafts[action.payload];
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConversationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.conversation = action.payload.list;
      })
      .addCase(getConversationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { setActiveConversation, saveDraft, clearDraft, setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;

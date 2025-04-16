import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getActiveConversationThunk, getConversationThunk, getMessagesByConversationThunk, sendMessageThunk } from "./chatThunks";

interface Message {
  id?: string;
  conversationId: string;
  sender: string;
  content: string;
  timestamp: string
}

interface Conversation {
  id?: string;
  name: string;
}

interface ChatState {
  activeConversation: Conversation | null;
  drafts: Record<string, string>;
  messages: Message[];
  conversation: Conversation[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  activeConversation: null,
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
    saveDraft: (state, action: PayloadAction<{ conversationId: string; draft: string }>) => {
      state.drafts[action.payload.conversationId] = action.payload.draft;
    },
    clearDraft: (state, action: PayloadAction<string>) => {
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
        state.error = action.payload || 'Fetch conversation failed';
      })
      .addCase(getActiveConversationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActiveConversationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.activeConversation = action.payload?.conversation
          ? { ...action.payload.conversation, id: String(action.payload.conversation.id) }
          : null;
      })
      .addCase(getActiveConversationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Fetch active conversation failed';
      })
      .addCase(getMessagesByConversationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessagesByConversationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.messages?.sort(
          (a: { timestamp: string }, b: { timestamp: string }): number => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        ) || [];
      })
      .addCase(getMessagesByConversationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Fetch messages by conversationId failed';
      })
      .addCase(sendMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Fetch messages by conversationId failed';
      });
  },
});

export const { saveDraft, clearDraft, setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;

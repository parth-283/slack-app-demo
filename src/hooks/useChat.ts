import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  saveDraft,
  clearDraft,
  setMessages,
  addMessage,
} from "../features/chat/chatSlice";
import { getActiveConversationThunk, getConversationThunk, getMessagesByConversationThunk } from "../features/chat/chatThunks";

export const useChat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeConversation, drafts, messages } = useSelector((state: RootState) => state.chat);

  const getConversationList = () => {
    dispatch(getConversationThunk())
  }

  const selectConversation = (conversationId: string) => {
    dispatch(getActiveConversationThunk(conversationId));
  };

  const saveDraftMessage = (conversationId: string, draft: string) => {
    dispatch(saveDraft({ conversationId, draft }));
  };

  const clearDraftMessage = (conversationId: string) => {
    dispatch(clearDraft(conversationId));
  };

  const loadMessages = (conversationId: string) => {
    dispatch(getMessagesByConversationThunk(conversationId));
  };

  const postNewMessage = (message: typeof messages[0]) => {
    dispatch(addMessage(message));
  };

  return {
    activeConversation,
    drafts,
    messages,
    selectConversation,
    saveDraftMessage,
    clearDraftMessage,
    loadMessages,
    postNewMessage,
    getConversationList
  };
};

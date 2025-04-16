import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setActiveConversation,
  saveDraft,
  clearDraft,
  setMessages,
  addMessage,
} from "../features/chat/chatSlice";
import { getConversationThunk } from "../features/chat/chatThunks";

export const useChat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeConversationId, drafts, messages } = useSelector((state: RootState) => state.chat);

  const getConversationList = () => {
    dispatch(getConversationThunk())
  }

  const selectConversation = (conversationId: number) => {
    dispatch(setActiveConversation(conversationId));
  };

  const saveDraftMessage = (conversationId: number, draft: string) => {
    dispatch(saveDraft({ conversationId, draft }));
  };

  const clearDraftMessage = (conversationId: number) => {
    dispatch(clearDraft(conversationId));
  };

  const loadMessages = (newMessages: typeof messages) => {
    dispatch(setMessages(newMessages));
  };

  const postNewMessage = (message: typeof messages[0]) => {
    dispatch(addMessage(message));
  };

  return {
    activeConversationId,
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

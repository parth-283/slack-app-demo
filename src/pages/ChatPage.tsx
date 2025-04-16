import React from "react";
import { useChat } from "../hooks/useChat";

function ChatPage() {
  const { activeConversationId, drafts, saveDraftMessage } = useChat();

  const handleDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeConversationId) {
      saveDraftMessage(activeConversationId, e.target.value);
    }
  };

  return (
    <input
      type="text"
      value={drafts[activeConversationId ?? 0] || ""}
      onChange={handleDraftChange}
    />
  );
}

export default ChatPage;

export const PREVIEWS_AND_UNREAD_MESSAGES = "[PREVIEWS AND UNREAD MESSAGES]";

export const MessagesQueryKeys = {
  UNREAD_MESSAGES_COUNT: [
    PREVIEWS_AND_UNREAD_MESSAGES,
    "Unread messages count"
  ],
  CONVERSATION_PREVIEWS: (page: number) => [
    PREVIEWS_AND_UNREAD_MESSAGES,
    "Conversation previews",
    page
  ],
  CONVERSATIONS_BY_PROPERTY_ID: (propertyId: string, recipientId: string) => [
    "[MESSAGES] Conversation by property id",
    propertyId,
    recipientId
  ]
};

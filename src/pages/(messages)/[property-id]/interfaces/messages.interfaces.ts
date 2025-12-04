export enum MESSAGE_TYPE {
  TEXT = "TEXT",
  VIEWING_REQUEST = "VIEWING_REQUEST"
}

export type CreateMessageDto = {
  propertyId: string;
  type: MESSAGE_TYPE;
  recipientId: string;
  content: string | null;
};

export type MessageDto = {
  messageId: string;
  propertyId: string;
  senderId: string;
  messageType: MESSAGE_TYPE;
  content: string | null;
  createdAt: Date | string;
  readAt: Date | string;
};

export type MessageDef = {
  messageId: string;
  propertyId: string;
  senderId: string;
  messageType: MESSAGE_TYPE;
  content: string | null;
  createdAt: Date | string;
  readAt: Date | string;
};

export type ConversationPreviewDto = {
  content: string | null;
  createdAt: string | Date;
  imageId: string | null;
  messageId: string;
  propertyId: string;
  recipientId: string;
  senderId: string;
  type: MESSAGE_TYPE;
  readAt: string | Date | null;
};

export type ConversationPreviewDef = {
  content: string | null;
  createdAt: string | Date;
  imageId: string | null;
  messageId: string;
  propertyId: string;
  recipientId: string;
  senderId: string;
  type: MESSAGE_TYPE;
  readAt: string | Date | null;
};

export type MessageMetaDef = {
  imageId: string | null;
};

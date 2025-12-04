export enum NotificationTypeEnum {
  PROPERTY_APPROVAL = "PROPERTY_APPROVAL",
  MESSAGE = "MESSAGE",
  NEW_PROPERTY_IN_SAVED_ZONE = "NEW_PROPERTY_IN_SAVED_ZONE"
}

export type NotificationDto = {
  notificationId: string;
  createdAt: string;
  readAt: string | null;
  type: NotificationTypeEnum;
};

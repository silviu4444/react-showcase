import { FC } from "react";
import {
  NotificationDto,
  NotificationTypeEnum
} from "../../interfaces/notification-system.interfaces";
import { useTranslation } from "react-i18next";
import useDateFormat from "@/shared/hooks/use-date-format";
import { useNavigate } from "react-router-dom";
import { RouterPages } from "@/shared/constants/router.constants";
import { Choose, When } from "@/shared/components/conditional-rendering";

type NotificationItemProps = {
  notification: NotificationDto;
};

const NotificationItem: FC<NotificationItemProps> = ({ notification }) => {
  const [t] = useTranslation();
  const format = useDateFormat();
  const navigate = useNavigate();

  function onNotificationClick(): void {
    switch (notification.type) {
      case NotificationTypeEnum.PROPERTY_APPROVAL:
        navigate(RouterPages.PropertiesToApprove);
        break;
    }
  }

  return (
    <div
      className="flex flex-col p-2 transition hover:bg-secondary/80"
      onClick={onNotificationClick}
    >
      <div className="text-sm">
        <Choose>
          <When
            condition={
              notification.type === NotificationTypeEnum.PROPERTY_APPROVAL
            }
          >
            <span>{t("a-new-property-has-been-added-updated")}</span>
          </When>

          <When
            condition={
              notification.type ===
              NotificationTypeEnum.NEW_PROPERTY_IN_SAVED_ZONE
            }
          >
            <span>
              {t(
                "one-ore-more-properties-have-been-recently-added-to-your-favorite-zone"
              )}
            </span>
          </When>
        </Choose>
      </div>
      <span className="text-end text-sm text-muted-foreground">
        {format({ date: notification.createdAt, format: "dd MMMM yyyy HH:mm" })}
      </span>
    </div>
  );
};

export default NotificationItem;

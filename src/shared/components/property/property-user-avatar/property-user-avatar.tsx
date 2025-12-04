import { PropertyTypeDef } from "@/shared/interfaces/property/property.interfaces";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { FC } from "react";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { cn } from "@/shared/lib/utils";

type PropertyUserAvatarProps = {
  user: PropertyTypeDef["user"] | undefined;
} & React.HTMLAttributes<HTMLDivElement>;

const PropertyUserAvatar: FC<PropertyUserAvatarProps> = ({
  user,
  className,
  ...props
}) => {
  const username = `${user?.firstName || ""} ${user?.lastName || ""}`;

  const usernameInitials = `${user?.firstName?.slice(0, 1) || "N"}${user?.lastName?.slice(0, 1) || "A"}`;
  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      <Avatar>
        <AvatarImage src={user?.picture || ""} />
        <AvatarFallback>{usernameInitials}</AvatarFallback>
      </Avatar>
      <span className="dynamic-ellipsis text-muted-foreground">
        <span>{username}</span>
      </span>
    </div>
  );
};

export default PropertyUserAvatar;

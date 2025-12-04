import { environment } from "@/environment";
import { cn } from "@/shared/lib/utils";
import { FC } from "react";
import { IconBaseProps } from "react-icons/lib";
import { LuExternalLink } from "react-icons/lu";

type OpenPropertyInExternalLinkProps = {
  pId: string;
} & IconBaseProps;

const OpenPropertyInExternalLink: FC<OpenPropertyInExternalLinkProps> = ({
  pId,
  className,
  ...props
}) => {
  const onClick = () => {
    window.open(`${environment.baseURL}p/${pId}`, "_blank");
  };

  return (
    <LuExternalLink
      className={cn("size-5 min-w-5 hover:opacity-70", className)}
      {...props}
      onClick={onClick}
    />
  );
};

export default OpenPropertyInExternalLink;

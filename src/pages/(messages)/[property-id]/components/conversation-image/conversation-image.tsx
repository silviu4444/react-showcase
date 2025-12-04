import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/shared/components/ui/avatar";
import { mapToPropertyImageSrc } from "@/shared/utils/cdn.utils";
import { FC } from "react";
import { MdImageNotSupported } from "react-icons/md";

type ConversationImageProps = {
  imageId: string | null | undefined;
};

const ConversationImage: FC<ConversationImageProps> = ({ imageId }) => {
  return (
    <Avatar>
      {imageId && <AvatarImage src={mapToPropertyImageSrc(imageId)} />}
      <AvatarFallback>
        <MdImageNotSupported className="size-8" />
      </AvatarFallback>
    </Avatar>
  );
};

export default ConversationImage;

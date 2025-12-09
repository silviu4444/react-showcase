import { useAuthModal } from "@/core/auth/hooks/use-auth-modal";
import { useUserState } from "@/core/hooks/auth.state";
import { useToggleFavoriteMutation } from "@/shared/hooks/property/use-toggle-favorite-mutation";
import { cn } from "@/shared/lib/utils";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { Choose, Otherwise, When } from "../conditional-rendering";

type AddToFavoriteButtonProps = {
  propertyId: string;
  ownerId: string;
  isFavorite: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const AddToFavoriteButton: FC<AddToFavoriteButtonProps> = ({
  propertyId,
  className,
  ownerId,
  isFavorite,
  ...props
}) => {
  const user = useUserState();
  const [_isFavorite, setIsFavorite] = useState(isFavorite);
  const { onOpen } = useAuthModal();
  const { mutate, isSuccess, data, isPending } = useToggleFavoriteMutation();

  const disabled = ownerId === user?.id;

  useEffect(() => {
    if (isSuccess) {
      setIsFavorite(data.isFavorite);
    }
  }, [isSuccess]);

  const addToFavorite: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (!user) {
      onOpen();
      return;
    }

    mutate({ propertyId });
  };

  return (
    <Button
      size="icon"
      className={cn("group min-w-9 touch-manipulation select-none", className)}
      variant="outline"
      {...props}
      disabled={isPending || disabled}
      onClick={addToFavorite}
    >
      <Choose>
        <When condition={_isFavorite}>
          <FaHeart className="text-red-400 transition duration-300 group-hover:scale-125" />
        </When>
        <Otherwise>
          <FaRegHeart className="transition duration-300 group-hover:scale-125" />
        </Otherwise>
      </Choose>
    </Button>
  );
};

export default AddToFavoriteButton;

import { useAuthModal } from "@/core/auth/hooks/use-auth-modal";
import { useIsAuthenticated } from "@/core/hooks/use-is-authenticated";
import { useTranslation } from "react-i18next";
import { FaHandPointUp, FaRegHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Choose, Otherwise, When } from "../conditional-rendering";
import { Button } from "../ui/button";
import useAddZoneToFavoritesMutation from "./hooks/use-add-zone-to-favorites-mutation";

type DrawingControllersProps = {
  enabled: boolean;
  drawingStarted: boolean;
  hasSelection: boolean;
  startDrawing: () => void;
  cancelDrawing: () => void;
  onSelectionClear: () => void;
};

const DrawingControllers: React.FC<DrawingControllersProps> = ({
  cancelDrawing,
  drawingStarted,
  enabled,
  hasSelection,
  onSelectionClear,
  startDrawing
}) => {
  const [t] = useTranslation();
  const isAuthenticated = useIsAuthenticated();
  const { mutate, isPending } = useAddZoneToFavoritesMutation();
  const { onOpen } = useAuthModal();

  const onAddZoneToFavorite = () => {
    if (!isAuthenticated) {
      onOpen();
      return;
    }

    mutate();
  };

  if (!enabled) return null;

  return (
    <div className="absolute right-2 top-1 z-10 flex translate-x-0 gap-2">
      <Choose>
        <When condition={drawingStarted}>
          <Button
            className="flex items-center gap-1"
            variant="destructive"
            onClick={cancelDrawing}
            size="sm"
          >
            {t("cancel")}
            <IoClose />
          </Button>
        </When>

        <When condition={hasSelection}>
          <div className="flex items-center gap-2">
            <Button
              className="flex items-center gap-1"
              variant="gradient"
              size="sm"
              onClick={onAddZoneToFavorite}
              disabled={isPending}
            >
              {t("save-the-selected-zone")}
              <FaRegHeart />
            </Button>
            <Button
              className="flex items-center gap-1"
              variant="destructive"
              onClick={onSelectionClear}
              size="sm"
            >
              {t("clear-selection")}
              <MdDelete />
            </Button>
          </div>
        </When>

        <Otherwise>
          <Button
            className="flex items-center gap-1"
            onClick={startDrawing}
            size="sm"
          >
            {t("select-an-area-on-the-map")}
            <FaHandPointUp />
          </Button>
        </Otherwise>
      </Choose>
    </div>
  );
};

export default DrawingControllers;

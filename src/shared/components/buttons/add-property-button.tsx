import { useAuthModal } from "@/core/auth/hooks/use-auth-modal";
import { useUserState } from "@/core/hooks/auth.state";
import { RouterPages } from "@/shared/constants/router.constants";
import { useTranslation } from "react-i18next";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "../ui/button";
import HoverTapEffect from "../ui/hover-tap-effect";

const AddPropertyButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  const navigate = useNavigate();
  const user = useUserState();
  const [t] = useTranslation();
  const { onOpen } = useAuthModal();

  const onAddProperty = () => {
    if (user) {
      navigate(RouterPages.AddProperty);
    } else {
      onOpen({ redirectUrlAfterAuth: RouterPages.AddProperty });
    }
  };
  return (
    <HoverTapEffect>
      <Button
        variant="gradient"
        className={className}
        onClick={onAddProperty}
        {...props}
      >
        {t("add-property")} <IoIosAdd className="size-6" />
      </Button>
    </HoverTapEffect>
  );
};

export default AddPropertyButton;

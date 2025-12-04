import useToast from "@/shared/hooks/use-toast";
import { FC } from "react";
import { Button } from "../../ui/button";
import { RxShare2 } from "react-icons/rx";

type SharePropertyButtonProps = {
  propertyId: string;
};

const SharePropertyButton: FC<SharePropertyButtonProps> = ({ propertyId }) => {
  const { toast } = useToast();

  const onShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/p/${propertyId}`);

    toast({
      message: "the-link-has-been-copied",
      type: "info"
    });
  };
  return (
    <Button variant="outline" size="icon" onClick={onShare}>
      <RxShare2 className="size-4" />
    </Button>
  );
};

export default SharePropertyButton;

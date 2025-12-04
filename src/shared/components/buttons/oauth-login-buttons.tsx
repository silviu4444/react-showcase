import { cn } from "@/shared/lib/utils";
import { Button } from "../ui/button";

import { useTranslation } from "react-i18next";
import { FaGoogle } from "react-icons/fa";

export type OAuthType = "google";

const OAuthOptions: { icon: JSX.Element; label: string; type: OAuthType }[] = [
  {
    icon: <FaGoogle className="size-4" />,
    label: "login-with-google",
    type: "google"
  }
];

type OAuthLoginButtonsProps = React.HTMLAttributes<HTMLDivElement> & {
  onAuth: (type: OAuthType) => void;
};

const OAuthLoginButtons: React.FC<OAuthLoginButtonsProps> = ({
  onAuth,
  className,
  ...props
}) => {
  const [t] = useTranslation();

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {OAuthOptions.map(({ icon, label, type }) => (
        <Button
          key={type}
          variant="outline"
          className="flex w-full items-center gap-1"
          onClick={() => onAuth(type)}
        >
          {icon}
          {t(label)}
        </Button>
      ))}
    </div>
  );
};

export default OAuthLoginButtons;

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/shared/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from "@/shared/components/ui/drawer";
import {
  deviceMatcherMap,
  useMediaQuery
} from "@/shared/hooks/use-media-query";
import { useTranslation } from "react-i18next";

interface DrawerModalProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DrawerModal: React.FC<DrawerModalProps> = ({
  title = "",
  description,
  children,
  open,
  onOpenChange
}) => {
  const [t] = useTranslation();
  const notPhoneSize = useMediaQuery(deviceMatcherMap.min640);

  if (notPhoneSize) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[530px]">
          <DialogTitle className="text-center font-medium">
            {t(title)}
          </DialogTitle>
          <DialogHeader>
            <DialogDescription className="text-center">
              {description || ""}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} repositionInputs={false}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-center font-medium">
            {t(title)}
          </DrawerTitle>
          <DrawerDescription className="text-center">
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="relative h-[80dvh] px-4 xs:h-[70dvh]" data-vaul-no-drag>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

import { Button } from "@/shared/components/ui/button";
import { useIsUploadingPhotos } from "@/shared/hooks/upload/use-is-uploading-photos";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ADD_PROPERTY_STEPS } from "../../constants/add-property-stepper.constants";
import { AddPropertyStepperType } from "../../schemas/add-property-stepper.schema";
import { stepper } from "./add-property-stepper";
import HoverTapEffect from "@/shared/components/ui/hover-tap-effect";

type StepperFormActionsProps = {
  editMode: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  methods: ReturnType<typeof stepper.useStepper>;
};
const StepperFormActions: React.FC<StepperFormActionsProps> = ({
  editMode,
  isLoading,
  isSuccess,
  methods
}) => {
  const [t] = useTranslation();
  const form = useFormContext<AddPropertyStepperType>();
  const { isUploadingPhotos } = useIsUploadingPhotos();

  useEffect(() => {
    if (isSuccess) {
      methods.goTo(ADD_PROPERTY_STEPS.STEP_SUCCESS);
    }
  }, [isSuccess]);

  const onNextStep = async () => {
    const formId = methods.current.id as ADD_PROPERTY_STEPS;
    await form.trigger(formId as any);
    const formState = form.getFieldState(formId as any);

    if (
      !formState.invalid &&
      methods.current.id !== ADD_PROPERTY_STEPS.STEP_PHOTOS
    ) {
      await new Promise((resolve) => {
        setTimeout(() => {
          form.clearErrors();
          methods.next();
          resolve(null);
        });
      });
    }
  };

  if (methods.isLast) {
    return;
  }

  return (
    <div className="mt-8 flex justify-between">
      {!methods.isFirst && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <HoverTapEffect>
            <Button
              onClick={methods.prev}
              variant="outline"
              disabled={isUploadingPhotos || isLoading}
              type="button"
            >
              {t("previous-step")}
            </Button>
          </HoverTapEffect>
        </motion.div>
      )}
      <motion.div
        className="ml-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <HoverTapEffect>
          <Button
            onClick={onNextStep}
            isLoading={isUploadingPhotos || isLoading}
            variant="gradient"
          >
            {methods.current.id === ADD_PROPERTY_STEPS.STEP_PHOTOS
              ? t(editMode ? "update-property" : "add-property")
              : t("next-step")}
          </Button>
        </HoverTapEffect>
      </motion.div>
    </div>
  );
};

export default StepperFormActions;

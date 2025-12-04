import {
  AddPropertyStepperDefaultValues,
  addPropertyStepperSchema,
  AddPropertyStepperType
} from "@/pages/(property)/add-property/schemas/add-property-stepper.schema";
import { PropertyTypeDef } from "@/shared/interfaces/property/property.interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { defineStepper } from "@stepperize/react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaListUl } from "react-icons/fa";
import { FiCamera, FiPhone } from "react-icons/fi";
import { TfiInfoAlt } from "react-icons/tfi";
import { ADD_PROPERTY_STEPS } from "../../constants/add-property-stepper.constants";
import useCreateUpdateProperty from "../../hooks/use-create-update-property";
import { mapPropertyToStepperData } from "../../utils/add-property-stepper.utils";
import BasicInfoStep from "./basic-info-step";
import CompletionScreen from "./completion-screen";
import ContactInfoStep from "./contact-info-step";
import DetailsStep from "./details-step";
import PhotosStep from "./photos-step";
import StepperFormActions from "./stepper-form-actions";
import StepperHeader from "./stepper-header";
import { useNavigate } from "react-router-dom";
import { RouterPages } from "@/shared/constants/router.constants";

export const stepper = defineStepper(
  {
    id: ADD_PROPERTY_STEPS.STEP_BASIC_INFO,
    label: "base-information",
    icon: TfiInfoAlt
  },
  { id: ADD_PROPERTY_STEPS.STEP_DETAILS, label: "details", icon: FaListUl },
  {
    id: ADD_PROPERTY_STEPS.STEP_CONTACT_INFO,
    label: "contact-info",
    icon: FiPhone
  },
  { id: ADD_PROPERTY_STEPS.STEP_PHOTOS, label: "photos", icon: FiCamera },
  { id: ADD_PROPERTY_STEPS.STEP_SUCCESS, label: "success", icon: CheckCircle }
);

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 500 : -500, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 500 : -500, opacity: 0 })
};

type AddPropertyStepperProps = {
  property?: PropertyTypeDef;
  editMode: boolean;
};

export default function AddPropertyStepper({
  editMode,
  property
}: AddPropertyStepperProps) {
  const [t] = useTranslation();
  const methods = stepper.useStepper();
  const navigate = useNavigate();

  const formMethods = useForm<AddPropertyStepperType>({
    resolver: zodResolver(addPropertyStepperSchema),
    defaultValues: property
      ? mapPropertyToStepperData(property)
      : AddPropertyStepperDefaultValues
  });

  const {
    createUpdate,
    isPending,
    isSuccess,
    reset: resetMutation
  } = useCreateUpdateProperty();

  function onSubmit(data: AddPropertyStepperType) {
    if (methods.current.id === ADD_PROPERTY_STEPS.STEP_PHOTOS) {
      createUpdate({ data, propertyId: property?.id || null });
    }
  }

  function onReset(): void {
    methods.reset();
    resetMutation();
    formMethods.reset(AddPropertyStepperDefaultValues);
    navigate(RouterPages.AddProperty);
  }

  const isComplete = methods.isLast;

  return (
    <stepper.Scoped>
      <FormProvider {...formMethods}>
        <form
          className="mx-auto max-w-4xl"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              className="mb-4 text-2xl font-bold sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className="text-gradient">
                {t(editMode ? "update-the-listing" : "complete-the-listing")}
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              type: "spring",
              stiffness: 50
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <StepperHeader methods={methods} isComplete={isComplete} />

            <div className="p-8">
              <AnimatePresence mode="wait" custom={methods.current.id}>
                {methods.when(ADD_PROPERTY_STEPS.STEP_BASIC_INFO, (step) => (
                  <motion.div
                    key="step1"
                    custom={methods.current.id}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 1200, damping: 80 },
                      opacity: { duration: 0.2 }
                    }}
                  >
                    <span className="mt-2 text-lg font-medium sm:hidden">
                      {t(step.label)}
                    </span>
                    <BasicInfoStep />
                  </motion.div>
                ))}
                {methods.when(ADD_PROPERTY_STEPS.STEP_DETAILS, (step) => (
                  <motion.div
                    key="step2"
                    custom={methods.current.id}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 1200, damping: 80 },
                      opacity: { duration: 0.2 }
                    }}
                  >
                    <span className="mt-2 text-lg font-medium sm:hidden">
                      {t(step.label)}
                    </span>
                    <DetailsStep />
                  </motion.div>
                ))}
                {methods.when(ADD_PROPERTY_STEPS.STEP_CONTACT_INFO, (step) => (
                  <motion.div
                    key="step3"
                    custom={methods.current.id}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 1200, damping: 80 },
                      opacity: { duration: 0.2 }
                    }}
                  >
                    <span className="mt-2 text-lg font-medium sm:hidden">
                      {t(step.label)}
                    </span>
                    <ContactInfoStep />
                  </motion.div>
                ))}
                {methods.when(ADD_PROPERTY_STEPS.STEP_PHOTOS, (step) => (
                  <motion.div
                    key="step4"
                    custom={methods.current.id}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 1200, damping: 80 },
                      opacity: { duration: 0.2 }
                    }}
                  >
                    <span className="mt-2 text-lg font-medium sm:hidden">
                      {t(step.label)}
                    </span>
                    <PhotosStep isSubmitting={isPending} />
                  </motion.div>
                ))}
                {methods.when(ADD_PROPERTY_STEPS.STEP_SUCCESS, () => (
                  <motion.div
                    key="step5"
                    custom={methods.current.id}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 1200, damping: 80 },
                      opacity: { duration: 0.2 }
                    }}
                  >
                    <CompletionScreen editMode={editMode} onReset={onReset} />
                  </motion.div>
                ))}
              </AnimatePresence>
              <StepperFormActions
                editMode={editMode}
                methods={methods}
                isLoading={isPending}
                isSuccess={isSuccess}
              />
            </div>
          </motion.div>
        </form>
      </FormProvider>
    </stepper.Scoped>
  );
}

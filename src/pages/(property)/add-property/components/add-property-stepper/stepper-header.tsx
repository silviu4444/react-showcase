import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AddPropertyStepperType } from "../../schemas/add-property-stepper.schema";
import { stepper } from "./add-property-stepper";
import { ADD_PROPERTY_STEPS } from "../../constants/add-property-stepper.constants";

const StepperHeader = ({
  methods,
  isComplete
}: {
  methods: ReturnType<typeof stepper.useStepper>;
  isComplete: boolean;
}) => {
  const form = useFormContext<AddPropertyStepperType>();
  const [t] = useTranslation();
  const currentIndex = methods.all.findIndex(
    (step) => step.id === methods.current.id
  );

  const isInvalid = (step: ADD_PROPERTY_STEPS) => {
    return form.getFieldState(step as any).invalid;
  };

  return (
    <nav className="bg-gray-50 p-8 dark:bg-gray-900">
      <ol className="relative flex items-center justify-between">
        <div className="absolute left-4 right-4 top-5 z-0 h-0.5 bg-gray-500 sm:left-12">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{
              width:
                methods.current.id === methods.all[methods.all.length - 1].id ||
                isComplete
                  ? "100%"
                  : `${(currentIndex / (methods.all.length - 1)) * 100}%`
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
        {methods.all.map((step, index) => {
          const isActive = step.id === methods.current.id;
          return (
            <li
              key={step.id}
              className="relative z-10 flex flex-shrink-0 flex-col items-center"
            >
              <motion.div
                className={cn(
                  "flex size-10 items-center justify-center rounded-full",
                  index <= currentIndex
                    ? "bg-primary text-white"
                    : isActive || isComplete
                      ? "bg-primary text-white dark:text-black"
                      : "bg-gray-900 text-white dark:bg-white dark:text-black",
                  isActive && isInvalid(step.id) && "bg-red-400 text-white"
                )}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  delay: 0.1 * index
                }}
              >
                {index < currentIndex || isComplete ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="size-5" />
                  </motion.div>
                ) : (
                  <step.icon className="size-5" />
                )}
              </motion.div>
              <motion.span
                className={cn(
                  "mt-2 hidden text-xs sm:block",
                  isActive
                    ? "text-indigo-11 font-medium"
                    : !isComplete && "text-gray-11"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + 0.1 * index }}
              >
                {t(step.label)}
              </motion.span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
export default StepperHeader;

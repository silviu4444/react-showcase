import ImageUploader from "@/shared/components/form/images-uploader/images-uploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/shared/components/ui/form";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AddPropertyStepperType } from "../../schemas/add-property-stepper.schema";

type PhotosStepProps = {
  isSubmitting?: boolean;
};

const PhotosStep: React.FC<PhotosStepProps> = ({ isSubmitting }) => {
  const form = useFormContext<AddPropertyStepperType>();
  const [t] = useTranslation();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="photosStep.photos"
        render={({ field }) => (
          <FormItem className="flex min-h-52 flex-col items-center justify-center">
            <FormControl>
              <ImageUploader
                data={field.value}
                onChange={field.onChange}
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage messageFactory={(message) => t(message)} />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default PhotosStep;

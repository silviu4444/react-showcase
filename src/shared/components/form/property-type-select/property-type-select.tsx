import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/components/ui/select";
import { PROPERTY_TYPES } from "@/shared/constants/property.constants";
import { SelectProps } from "@radix-ui/react-select";
import { useTranslation } from "react-i18next";
import { FormControl } from "../../ui/form";

const PropertyTypeSelect: React.FC<SelectProps> = (props) => {
  const [t] = useTranslation();

  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={t("property-type")} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {PROPERTY_TYPES.map(({ type, labelKey }) => (
          <SelectItem key={type} value={type}>
            {t(labelKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PropertyTypeSelect;

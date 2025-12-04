import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/components/ui/select";
import { RelationOptions } from "@/shared/constants/property.constants";
import { SelectProps } from "@radix-ui/react-select";
import { useTranslation } from "react-i18next";
import { FormControl } from "../../ui/form";

const RelationTypeSelect: React.FC<SelectProps> = (props) => {
  const [t] = useTranslation();

  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={t("property-type")} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {RelationOptions.map(({ value, labelKey }) => (
          <SelectItem key={value} value={value}>
            {t(labelKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RelationTypeSelect;

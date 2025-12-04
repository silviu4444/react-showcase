import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/components/ui/select";
import { useModal } from "@/shared/hooks/use-modal";
import { SelectProps } from "@radix-ui/react-select";
import { useTranslation } from "react-i18next";
import { IoIosAdd } from "react-icons/io";
import { Button } from "../../ui/button";
import { FormControl } from "../../ui/form";

type PhoneNumberSelectProps = SelectProps & {
  phoneNumberList: string[];
  withAddButton?: boolean;
};

const PhoneNumberSelect: React.FC<PhoneNumberSelectProps> = (props) => {
  const { phoneNumberList, withAddButton, ...rest } = props;
  const [t] = useTranslation();
  const { onOpen } = useModal();

  return (
    <div className="flex items-center gap-2">
      <Select {...rest}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={t("phone-number")} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {phoneNumberList.map((number) => (
            <SelectItem key={number} value={number}>
              {number}
            </SelectItem>
          ))}
          {!phoneNumberList.length && (
            <div className="flex w-full items-center justify-center p-2">
              <span className="text-sm">{t("no-phone-number-added-yet")}</span>
            </div>
          )}
        </SelectContent>
      </Select>

      {withAddButton && (
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={() => onOpen("add-phone-number")}
        >
          <IoIosAdd className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default PhoneNumberSelect;

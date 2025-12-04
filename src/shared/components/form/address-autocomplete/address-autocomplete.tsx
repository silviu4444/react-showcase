import { AddressAutocompleteType } from "@/shared/interfaces/forms/address-autocomplete.interfaces";
import { AddressAutocompleteValueDef } from "@/shared/schemas/address-autocomplete.schema";
import { CommandGroup } from "cmdk";
import {
  ElementRef,
  FocusEventHandler,
  useEffect,
  useRef,
  useState
} from "react";
import { useTranslation } from "react-i18next";
import { Command, CommandItem, CommandList } from "../../ui/command";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import Spinner from "../../ui/spinner";
import useAddressAutocomplete from "./use-address-autocomplete";
import { APIProvider } from "@vis.gl/react-google-maps";
import { environment } from "@/environment";

type AddressAutocompleteProps = {
  className?: string;
  defaultValue?: AddressAutocompleteValueDef;
  onChange: (value: AddressAutocompleteValueDef) => void;
  placeholderKey?: string;
  type?: AddressAutocompleteType;
};

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  className,
  defaultValue,
  onChange,
  placeholderKey = "address",
  type = "address"
}) => {
  const inputRef = useRef<ElementRef<"input"> | null>(null);
  const [t] = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);

  const {
    selectedAddress,
    handleChange,
    handleSelect,
    predictions,
    isLoading
  } = useAddressAutocomplete({ inputRef, defaultValue, type, apiLoaded });

  useEffect(() => {
    onChange(selectedAddress);
  }, [selectedAddress]);

  const onFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsOpened(true);
    e.target.setSelectionRange(0, e.target.value.length);
  };

  return (
    <APIProvider
      apiKey={environment.googleAPIKey}
      onLoad={() => setApiLoaded(true)}
      language="en"
      libraries={["places"]}
    >
      <Popover open={isOpened && !!predictions.length} modal>
        <PopoverTrigger asChild>
          <div className={className || ""}>
            <div className="relative">
              <Input
                className={className || ""}
                placeholder={t(placeholderKey)}
                type="text"
                ref={inputRef}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={() => setTimeout(() => setIsOpened(false), 100)}
              />
              {isLoading && (
                <Spinner
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  size="small"
                />
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="p-1"
          style={{ width: inputRef?.current?.offsetWidth || 200 }}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Command>
            <CommandList>
              <CommandGroup onClick={(e) => e.stopPropagation()}>
                {predictions.map((prediction) => (
                  <CommandItem
                    key={prediction.place_id}
                    value={prediction.place_id}
                    onSelect={handleSelect}
                  >
                    {prediction.description}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </APIProvider>
  );
};

export default AddressAutocomplete;

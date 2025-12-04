import { ChangeEvent, KeyboardEventHandler, useRef } from "react";
import { Button, ButtonProps } from "../../ui/button";

type UploadInputProps = ButtonProps & {
  multiple?: boolean;
  onImageUpload: (data: FileList | null) => void;
};

const UploadImageInput: React.FC<UploadInputProps> = ({
  children,
  multiple,
  onImageUpload,
  disabled,
  ...otherProps
}) => {
  const inputRef = useRef<any>();

  const onKeyDown: KeyboardEventHandler<HTMLButtonElement> = (event) => {
    (event.code === "Space" || event.code === "Enter") &&
      inputRef?.current?.click();
  };

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTarget = event.target as HTMLInputElement;
    onImageUpload(inputTarget.files);
  };

  return (
    <>
      <Button
        {...otherProps}
        variant="outline"
        disabled={disabled}
        onKeyDown={onKeyDown}
        onClick={() => inputRef?.current?.click()}
        type="button"
        role="button"
      >
        {children}
      </Button>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        accept="image/*"
        onClick={(event) => {
          const target = event.target as HTMLInputElement;
          target && (target.value = "");
        }}
        multiple={multiple}
        onChange={(event) => onUpload(event)}
        disabled={!!disabled}
      />
    </>
  );
};

export default UploadImageInput;

import { useEffect, useState } from "react";
import { ModalConfirmationDataKeys, useModal } from "./use-modal";

type useReadConfirmationDataProps = {
  key: ModalConfirmationDataKeys;
};

const useReadConfirmationData = <T>({ key }: useReadConfirmationDataProps) => {
  const [data, setData] = useState<T | null>(null);
  const { confirmationData, resetConfirmationData } = useModal();

  useEffect(() => {
    const watchData = confirmationData[key] as T;

    if (watchData) {
      setData(watchData);
      resetConfirmationData();
    }
  }, [confirmationData]);

  return data;
};

export default useReadConfirmationData;

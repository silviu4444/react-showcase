import ModalProvider from "@/shared/providers/modal-providers";
import AppLayout from "./components/app-layout";

interface AppFrameProps {
  children: React.ReactNode;
}

const AppFrame: React.FC<AppFrameProps> = ({ children }) => {
  return (
    <>
      <ModalProvider />
      <AppLayout>{children}</AppLayout>
    </>
  );
};

export default AppFrame;

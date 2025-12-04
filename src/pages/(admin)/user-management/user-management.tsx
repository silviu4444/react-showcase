import Container from "@/shared/components/ui/container";
import AdminModalProvider from "./components/modal-provider/modal-provider";
import UserManagementView from "./components/user-management-view/user-management-view";

const UserManagementPage = () => {
  return (
    <Container className="h-full">
      <AdminModalProvider />
      <UserManagementView />
    </Container>
  );
};

export default UserManagementPage;

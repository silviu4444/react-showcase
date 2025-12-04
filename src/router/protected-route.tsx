import { Navigate } from "react-router-dom";

interface Props {
  isAllowed: boolean;
  children: React.ReactNode;
  navigateTo: string;
}

const ProtectedRoute: React.FC<Props> = ({
  children,
  isAllowed,
  navigateTo
}) => (!isAllowed ? <Navigate to={navigateTo} /> : children);

export default ProtectedRoute;

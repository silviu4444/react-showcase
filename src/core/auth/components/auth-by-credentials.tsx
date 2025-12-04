import { AuthMode } from "../interfaces/auth.interfaces";
import Login from "./login";
import Register from "./register";

interface AuthByCredentialsProps {
  authMode: AuthMode;
  setAuthMode: (value: AuthMode) => void;
  onClose: () => void;
}

const AuthByCredentials = ({
  authMode,
  setAuthMode,
  onClose
}: AuthByCredentialsProps) => {
  return authMode === "login" ? (
    <Login setAuthMode={setAuthMode} onClose={onClose} />
  ) : (
    <Register setAuthMode={setAuthMode} onClose={onClose} />
  );
};

export default AuthByCredentials;

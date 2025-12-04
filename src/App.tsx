import useRefreshToken from "./core/hooks/use-refresh-token";
import AppRoutes from "./router/app-routes";
import Preloader from "./shared/components/preloader/preloader";
import useSocketInitializer from "./shared/hooks/socket/use-socket-initializer";

function App() {
  useSocketInitializer();
  const { isPending, isAuthenticated } = useRefreshToken();

  if (isPending && isAuthenticated) {
    return <Preloader />;
  }

  return <AppRoutes />;
}

export default App;

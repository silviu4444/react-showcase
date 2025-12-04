import { useIsAuthenticated } from "@/core/hooks/use-is-authenticated";
import { useUserRole } from "@/core/hooks/use-user-role";
import ChatItem from "@/pages/(messages)/[property-id]/components/chat-item-view/chat-item/chat-item";
import Spinner from "@/shared/components/ui/spinner";
import { RouterPages } from "@/shared/constants/router.constants";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./protected-route";

const Home = lazy(() => import("../pages/(home)/overview/overview"));
const SearchByGrid = lazy(
  () => import("../pages/(search)/grid/search-by-grid")
);
const SearchByMap = lazy(() => import("../pages/(search)/map/search-by-map"));
const OAuthSuccess = lazy(
  () => import("../pages/(oauth)/oauth-success/oauth-success")
);
const EmailVerifiedSuccessfully = lazy(
  () =>
    import(
      "../core/auth/components/email-verified-successfully/email-verified-successfully"
    )
);
const EmailVerifiedUnsuccessfully = lazy(
  () =>
    import(
      "../core/auth/components/email-verified-unsuccessfully/email-verified-unsuccessfully"
    )
);
const AdminUserManagement = lazy(
  () => import("../pages/(admin)/user-management/user-management")
);

const PropertiesToApprove = lazy(
  () =>
    import("../pages/(moderator)/properties-to-approve/properties-to-approve")
);
const PropertyById = lazy(
  () => import("../pages/(property)/[id]/property-by-id")
);
const AddProperty = lazy(
  () => import("../pages/(property)/add-property/add-property")
);
const UserProperties = lazy(
  () => import("../pages/(user)/properties/properties")
);
const Messages = lazy(
  () => import("../pages/(messages)/[property-id]/messages")
);

const publicRoutes = (
  <>
    <Route
      path={RouterPages.SearchByGrid}
      element={
        <Suspense fallback={<Spinner center size="medium" />}>
          <SearchByGrid />
        </Suspense>
      }
    />
    <Route
      path={RouterPages.SearchByMap}
      element={
        <Suspense fallback={<Spinner center size="medium" />}>
          <SearchByMap />
        </Suspense>
      }
    />

    <Route
      path={RouterPages.OAuthSuccess}
      element={
        <Suspense fallback={<Spinner center size="medium" />}>
          <OAuthSuccess />
        </Suspense>
      }
    />

    <Route
      path={RouterPages.EmailVerifiedSuccessfully}
      element={
        <Suspense fallback={<Spinner center size="medium" />}>
          <EmailVerifiedSuccessfully />
        </Suspense>
      }
    />

    <Route
      path={RouterPages.EmailVerifiedUnsuccessfully}
      element={
        <Suspense fallback={<Spinner center size="medium" />}>
          <EmailVerifiedUnsuccessfully />
        </Suspense>
      }
    />

    <Route
      path={RouterPages.Home}
      element={
        <Suspense fallback={<Spinner center size="medium" />}>
          <Home />
        </Suspense>
      }
    />
  </>
);

const useMapRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
  const { isAdmin, isModerator } = useUserRole();

  const routes = (
    <>
      <Route
        path={RouterPages.AddProperty}
        element={
          <ProtectedRoute isAllowed={isAuthenticated} navigateTo="/">
            <Suspense fallback={<Spinner center size="medium" />}>
              <AddProperty />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path={RouterPages.PropertyById}
        element={
          <Suspense fallback={<Spinner center size="medium" />}>
            <PropertyById />
          </Suspense>
        }
      />

      <Route
        path={RouterPages.Messages}
        element={
          <ProtectedRoute isAllowed={isAuthenticated} navigateTo="/">
            <Suspense fallback={<Spinner center size="medium" />}>
              <Messages />
            </Suspense>
          </ProtectedRoute>
        }
      >
        <Route path=":propertyId/:userId" element={<ChatItem />} />
      </Route>
      <Route
        path={RouterPages.UserProperties}
        element={
          <ProtectedRoute isAllowed={isAuthenticated} navigateTo="/">
            <Suspense fallback={<Spinner center size="medium" />}>
              <UserProperties />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path={RouterPages.AdminUserManagement}
        element={
          <ProtectedRoute isAllowed={isAdmin} navigateTo="/">
            <Suspense fallback={<Spinner center size="medium" />}>
              <AdminUserManagement />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path={RouterPages.PropertiesToApprove}
        element={
          <ProtectedRoute isAllowed={isAdmin || isModerator} navigateTo="/">
            <Suspense fallback={<Spinner center size="medium" />}>
              <PropertiesToApprove />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path={RouterPages.AddProperty}
        element={
          <ProtectedRoute isAllowed={isAuthenticated} navigateTo="/">
            <Suspense fallback={<Spinner center size="medium" />}>
              <AddProperty />
            </Suspense>
          </ProtectedRoute>
        }
      />

      {publicRoutes}
    </>
  );
  return { routes };
};

export default useMapRoutes;

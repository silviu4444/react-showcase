
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosInterceptor } from "../lib/axios";
import { UIProvider } from "./ui-provider";

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    },
    mutations: {
      retry: 0
    }
  }
});


interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AxiosInterceptor>
      <UIProvider>{children}</UIProvider>
    </AxiosInterceptor>
    <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
  </QueryClientProvider>
);

export default AppProvider;

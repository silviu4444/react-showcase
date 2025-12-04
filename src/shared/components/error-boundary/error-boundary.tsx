import { useState } from "react";
import { ErrorBoundary as WithErrorBoundary } from "react-error-boundary";
import FallbackComponent from "./fallback-component";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [key, setKey] = useState(0);

  return (
    <WithErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <FallbackComponent
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          onRetry={() => setKey((prev) => prev + 1)}
        />
      )}
      resetKeys={[key]}
    >
      {children}
    </WithErrorBoundary>
  );
};

export default ErrorBoundary;

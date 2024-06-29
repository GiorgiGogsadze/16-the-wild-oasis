import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./ui/ErrorFallback";

// import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="445758568-i3l4cp1b2846p7phol1t7b2.apps.googleusercontent.com"> */}
    <ErrorBoundary
      FallbackComponent={ErrorFallBack}
      onReset={() => {
        window.location.replace("/");
      }}
    >
      <App />
    </ErrorBoundary>
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="154338058603-pic2cpsca70fn2icdsa3dmfenl9bbce6.apps.googleusercontent.com"> */}
    <App />
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);

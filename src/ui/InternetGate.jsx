import { useEffect, useState } from "react";

export default function InternetGate({ children }) {
  const [isInternet, setIsInternet] = useState(window.navigator.onLine);
  useEffect(() => {
    window.addEventListener("offline", () => setIsInternet(false));
    window.addEventListener("online", () => setIsInternet(true));
  }, []);
  return isInternet ? children : <h2>Please, connect to Internet</h2>;
}

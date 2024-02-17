import { useEffect, useRef } from "react";

export default function useOutsideClick(
  ouOutsideClick,
  listenCapturing = true
) {
  const ref = useRef();
  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) ouOutsideClick();
    }
    document.addEventListener("click", close, listenCapturing);
    return () => document.removeEventListener("click", close, listenCapturing);
  }, [ouOutsideClick, listenCapturing]);
  return ref;
}

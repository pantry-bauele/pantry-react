import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Credit: https://v5.reactrouter.com/web/guides/scroll-restoration
export const ResetScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

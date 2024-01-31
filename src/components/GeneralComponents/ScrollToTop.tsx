import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type ScrollToTopProps = {
    children:any
}
export default function ScrollToTop(props:ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
      <div>
          {props.children}
      </div>
  )
}
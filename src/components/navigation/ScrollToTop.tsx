import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Delay to ensure page content is loaded
    const timer = setTimeout(() => {
      // Scroll to very top to ensure header is visible
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
      
      // Focus on main content for accessibility
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop; 
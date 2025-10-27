import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useMenuState = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // States to control dropdown visibility
  const [servicosOpen, setServicosOpen] = useState(false);
  const [conteudoOpen, setConteudoOpen] = useState(false);
  const [setoresOpen, setSetoresOpen] = useState(false);
  const [produtosOpen, setProdutosOpen] = useState(false);
  
  // Refs for hover timers
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Close all dropdowns when route changes
  useEffect(() => {
    setServicosOpen(false);
    setConteudoOpen(false);
    setSetoresOpen(false);
    setProdutosOpen(false);
  }, [location.pathname]);
  
  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);
  
  // Close all dropdowns
  const closeAllDropdowns = () => {
    setServicosOpen(false);
    setConteudoOpen(false);
    setSetoresOpen(false);
    setProdutosOpen(false);
  };
  
  // Enhanced setters with hover delay for closing
  const setServicosOpenWithDelay = (open: boolean) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    
    if (open) {
      closeAllDropdowns();
      setServicosOpen(true);
    } else {
      hoverTimerRef.current = setTimeout(() => {
        setServicosOpen(false);
      }, 150); // 150ms delay before closing
    }
  };
  
  const setConteudoOpenWithDelay = (open: boolean) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    
    if (open) {
      closeAllDropdowns();
      setConteudoOpen(true);
    } else {
      hoverTimerRef.current = setTimeout(() => {
        setConteudoOpen(false);
      }, 150);
    }
  };
  
  const setSetoresOpenWithDelay = (open: boolean) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    
    if (open) {
      closeAllDropdowns();
      setSetoresOpen(true);
    } else {
      hoverTimerRef.current = setTimeout(() => {
        setSetoresOpen(false);
      }, 150);
    }
  };

  const setProdutosOpenWithDelay = (open: boolean) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    
    if (open) {
      closeAllDropdowns();
      setProdutosOpen(true);
    } else {
      hoverTimerRef.current = setTimeout(() => {
        setProdutosOpen(false);
      }, 150);
    }
  };
  
  // Direct navigation handlers for main menu items
  const navigateTo = (path: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Always close all dropdowns before navigating
    closeAllDropdowns();
    navigate(path);
  };

  return {
    location,
    servicosOpen,
    setServicosOpen: setServicosOpenWithDelay,
    conteudoOpen,
    setConteudoOpen: setConteudoOpenWithDelay,
    setoresOpen,
    setSetoresOpen: setSetoresOpenWithDelay,
    produtosOpen,
    setProdutosOpen: setProdutosOpenWithDelay,
    closeAllDropdowns,
    navigateTo,
  };
};
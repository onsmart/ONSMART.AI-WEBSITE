
import React from 'react';
import { useLocation } from 'react-router-dom';

interface RouteTransitionProps {
  children: React.ReactNode;
}

export const RouteTransition: React.FC<RouteTransitionProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className="w-full opacity-0 animate-fade-in"
    >
      {children}
    </div>
  );
};

export default RouteTransition;

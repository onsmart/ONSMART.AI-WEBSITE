
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="flex items-center">
        <img 
          src="/images/banner-preto.png" 
          alt="onsmart.AI Logo" 
          className="h-8 object-contain" 
        />
      </div>
    </Link>
  );
};

export default Logo;

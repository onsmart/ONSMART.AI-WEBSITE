
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-0 p-0 m-0">
      <div className="flex items-center p-0 m-0">
        <img 
          src="/images/banner-preto.png" 
          alt="onsmart.AI Logo" 
          className="h-6 sm:h-7 md:h-8 w-auto object-contain dark:hidden" 
        />
        <img 
          src="/images/banner-branco.png" 
          alt="onsmart.AI Logo" 
          className="h-6 sm:h-7 md:h-8 w-auto object-contain hidden dark:block" 
        />
      </div>
    </Link>
  );
};

export default Logo;

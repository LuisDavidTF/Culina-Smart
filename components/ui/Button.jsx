import React from 'react';

export const Button = ({ children, onClick, type = 'button', variant = 'primary', isLoading = false, className = '', ...props }) => {
  /* 
    PREMIUM BUTTON DESIGN SYSTEM
    - Uses Gradients to match app vitality.
    - Uses Shadows and Transform for tactile feedback ("Pop").
  */
  const baseClasses = "flex justify-center items-center py-2.5 px-5 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transform hover:-translate-y-0.5 hover:shadow-lg";

  const variants = {
    // PRIMARY: Emerald Gradient (Main Call-to-Action)
    primary: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 focus:ring-emerald-500 shadow-emerald-500/30",

    // SECONDARY: Blue Gradient (Edit, Navigate, Info) - Matches --secondary
    secondary: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 focus:ring-blue-500 shadow-blue-500/30",

    // DANGER: Red Gradient (Delete, Critical)
    danger: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 focus:ring-red-500 shadow-red-500/30",

    // GHOST: Subtle, transparent (Cancel, Secondary Nav)
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white shadow-none hover:shadow-none translate-y-0 hover:translate-y-0 border-gray-200 dark:border-gray-700 border",

    // OUTLINE: Clean border (Alternative)
    outline: "bg-transparent border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-400 dark:hover:text-emerald-400 shadow-none hover:shadow-sm translate-y-0",

    // EDIT: Legacy alias mapped to Secondary for backward compatibility but using the new Blue Gradient
    edit: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 focus:ring-blue-500 shadow-blue-500/30",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClasses} ${variants[variant]} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : children}
    </button>
  );
};
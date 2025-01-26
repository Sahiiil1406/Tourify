import React from 'react';

export const Card = ({ children, className, ...props }) => (
 <div className={`bg-[#1f1f1f] rounded-md shadow-md ${className}`} {...props}>
   {children}
 </div>
);

export const CardHeader = ({ children, className, ...props }) => (
 <div className={`p-4 border-b border-[#2f2f2f] ${className}`} {...props}>
   {children}
 </div>
);

export const CardTitle = ({ children, className, ...props }) => (
 <h3 className={`text-lg font-medium ${className}`} {...props}>
   {children}
 </h3>
);

export const CardContent = ({ children, className, ...props }) => (
 <div className={`p-4 ${className}`} {...props}>
   {children}
 </div>
);

export const Button = ({ children, className, ...props }) => (
 <button
   className={`bg-[#3b82f6] text-white px-4 py-2 rounded-md hover:bg-[#2563eb] ${className}`}
   {...props}
 >
   {children}
 </button>
);
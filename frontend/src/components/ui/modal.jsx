import React from 'react';

export const Modal = ({ children, className, ...props }) => (
 <div className={`fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 ${className}`} {...props}>
   {children}
 </div>
);

export const ModalHeader = ({ children, className, ...props }) => (
 <div className={`bg-[#1f1f1f] px-4 py-2 border-b border-[#2f2f2f] ${className}`} {...props}>
   {children}
 </div>
);

export const ModalBody = ({ children, className, ...props }) => (
 <div className={`bg-[#1f1f1f] p-4 ${className}`} {...props}>
   {children}
 </div>
);

export const ModalFooter = ({ children, className, ...props }) => (
 <div className={`bg-[#1f1f1f] px-4 py-2 border-t border-[#2f2f2f] flex justify-end ${className}`} {...props}>
   {children}
 </div>
);
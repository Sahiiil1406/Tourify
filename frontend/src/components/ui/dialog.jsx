// Dialog.js
import React from 'react';

export const Dialog = ({ children, open, onClose, className, ...props }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        open ? 'visible' : 'invisible'
      } ${className}`}
      onClick={onClose}
      {...props}
    >
      {children}
    </div>
  );
};

export const DialogContent = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-[#1f1f1f] rounded-md shadow-md p-6 max-w-[600px] w-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const DialogHeader = ({ children, className, ...props }) => {
  return (
    <div className={`border-b border-[#2f2f2f] pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const DialogTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={`text-lg font-medium ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const DialogFooter = ({ children, className, ...props }) => {
  return (
    <div className={`mt-4 flex justify-end space-x-2 ${className}`} {...props}>
      {children}
    </div>
  );
};
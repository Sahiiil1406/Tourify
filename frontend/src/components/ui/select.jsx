// Select.js
import React, { useState, useRef, useEffect } from 'react';

export const Select = ({ children, value, onChange, className, ...props }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative inline-block ${className}`} {...props}>
      {children}
    </div>
  );
};

export const SelectTrigger = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={`bg-[#2f2f2f] text-white px-4 py-2 rounded-md flex items-center justify-between w-full ${className}`}
      {...props}
    >
      {children}
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
};

export const SelectContent = ({ children, className, ...props }) => {
  return (
    <div
      className={`absolute bg-[#1f1f1f] rounded-md shadow-md mt-2 w-full z-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const SelectItem = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={`block px-4 py-2 hover:bg-[#2f2f2f] w-full text-left ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const SelectValue = ({ children, className, ...props }) => {
  return (
    <span className={`truncate ${className}`} {...props}>
      {children}
    </span>
  );
};
import React from 'react';

export const Table = ({ children, className, ...props }) => (
 <table className={`w-full border-collapse ${className}`} {...props}>
   {children}
 </table>
);

export const TableHead = ({ children, className, ...props }) => (
 <thead className={`bg-[#2f2f2f] ${className}`} {...props}>
   {children}
 </thead>
);

export const TableBody = ({ children, className, ...props }) => (
 <tbody className={className} {...props}>
   {children}
 </tbody>
);

export const TableRow = ({ children, className, ...props }) => (
 <tr className={`hover:bg-[#2f2f2f] ${className}`} {...props}>
   {children}
 </tr>
);


export const TableCell = ({ children, className, ...props }) => (
    <td className={`p-2 border-b border-[#2f2f2f] ${className}`} {...props}>
      {children}
    </td>
   );
   

   export const TableHeader = ({ children, className, ...props }) => (
    <thead className={`bg-[#2f2f2f] ${className}`} {...props}>
      {children}
    </thead>
  );
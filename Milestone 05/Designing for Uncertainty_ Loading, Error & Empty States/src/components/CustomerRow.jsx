import React from 'react';

const CustomerRow = ({ customer }) => {
  return (
    <tr className="hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors">
      <td className="px-6 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            {customer.name.charAt(0)}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900 leading-tight">{customer.name}</p>
            <p className="text-xs text-gray-500 leading-tight">{customer.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {customer.orders} orders
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
        ${customer.spent.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
        <button className="text-blue-600 hover:text-blue-900 font-medium tracking-tight">View Profile</button>
      </td>
    </tr>
  );
};

export default CustomerRow;

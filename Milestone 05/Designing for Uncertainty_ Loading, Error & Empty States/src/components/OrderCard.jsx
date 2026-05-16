import React from 'react';

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-gray-800">{order.id}</h3>
        <p className="text-sm text-gray-500">{order.customer}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
        <span className={`text-xs px-2 py-1 rounded-full ${
          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {order.status}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;

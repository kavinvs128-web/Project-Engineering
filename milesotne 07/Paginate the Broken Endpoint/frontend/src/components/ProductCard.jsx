import React from 'react';

const CATEGORY_ICONS = {
  electronics: '💻',
  clothing: '👕',
  books: '📚',
  home: '🏠',
  sports: '⚽',
  toys: '🧸',
  food: '🍎',
  health: '💊',
};

export default function ProductCard({ product }) {
  const { name, category, price, stock, imageUrl } = product;
  const icon = CATEGORY_ICONS[category] ?? '📦';
  const isLowStock = stock < 10;

  return (
    <article className="product-card">
      {imageUrl ? (
        <img
          className="card-image"
          src={imageUrl}
          alt={name}
          loading="lazy"
        />
      ) : (
        <div className="card-image-placeholder" aria-hidden="true">
          {icon}
        </div>
      )}

      <div className="card-body">
        <span className="card-category">{category}</span>
        <p className="card-name">{name}</p>
        <div className="card-footer">
          <span className="card-price">${price.toFixed(2)}</span>
          <span className={`card-stock${isLowStock ? ' low' : ''}`}>
            {stock === 0 ? 'Out of stock' : `${stock} in stock`}
          </span>
        </div>
      </div>
    </article>
  );
}

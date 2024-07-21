import React from 'react';
import './ProductItem.css';

interface ProductItemProps {
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
    picture: string;
  };
  quantity: number;
  onQuantityChange: (productId: number, newQuantity: number) => void;
  onDelete: (productId: number) => void;
}

const ProductItem = ({
  product,
  quantity,
  onQuantityChange,
  onDelete,
}: ProductItemProps) => {
  return (
    <li>
      <div className="product-item">
        <img className="pi__img" src={product.picture} alt={product.name} />
        <div className="pi__content">
          <strong>{product.name}</strong>
          <p>Stock: {product.stock}</p>
          <p>Price: ${product.price}</p>
          <p>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                onQuantityChange(product.id, Number(e.target.value))
              }
              min="1"
              max={product.stock}
            />
          </p>
          <p>Total: ${product.price * quantity}</p>
          <button
            type="button"
            className="pic__delete"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;

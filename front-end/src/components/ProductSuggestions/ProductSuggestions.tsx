import React from 'react';
import './ProductSuggestions.css';

interface ProductSuggestionsProps {
  products: {
    id: number;
    name: string;
    price: number;
    stock: number;
    picture: string;
  }[];
  onSelect: (product: any) => void;
}

const ProductSuggestions = ({
  products,
  onSelect,
}: ProductSuggestionsProps) => {
  return (
    <ul className="product-suggestion--wrapper">
      {products.map((product) => (
        <li key={product.id} onClick={() => onSelect(product)}>
          <div className="product-suggestion">
            <img
              src={product.picture}
              alt={product.name}
              className="ps__image"
            />
            <div className="ps__content">
              <strong>{product.name}</strong>
              <p>Stock: {product.stock}</p>
              <p>Price: ${product.price}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductSuggestions;

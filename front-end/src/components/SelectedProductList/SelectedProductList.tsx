import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import './SelectedProductList.css';

interface SelectedProductsListProps {
  selectedProducts: {
    product: {
      id: number;
      name: string;
      price: number;
      stock: number;
      picture: string;
    };
    quantity: number;
  }[];
  onQuantityChange: (productId: number, newQuantity: number) => void;
  onDelete: (productId: number) => void;
  validationErrors: string[];
}

const SelectedProductsList = ({
  selectedProducts,
  onQuantityChange,
  onDelete,
  validationErrors,
}: SelectedProductsListProps) => {
  return (
    <div className="product-list">
      <ul>
        {selectedProducts.map((item) => (
          <ProductItem
            key={item.product.id}
            product={item.product}
            quantity={item.quantity}
            onQuantityChange={onQuantityChange}
            onDelete={onDelete}
          />
        ))}
      </ul>
      {selectedProducts.length === 0 &&
        validationErrors.includes('At least one product must be selected') && (
          <p className="error">At least one product must be selected</p>
        )}
    </div>
  );
};

export default SelectedProductsList;

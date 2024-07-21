import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { addInvoice } from '../../redux/actions/invoiceActions';
import ProductSuggestions from '../../components/ProductSuggestions/ProductSuggestions';
import SelectedProductsList from '../../components/SelectedProductList/SelectedProductList';
import './PageInvoice.css';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import products from '../../data/product.json';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  picture: string;
}

export function Component() {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.invoice
  );

  const [formData, setFormData] = useState({
    invoice_no: 0,
    date: '',
    customer_name: '',
    salesperson_name: '',
    payment_type: 'cash',
    notes: '',
    total_amount: 0,
    products: [],
  });

  const [selectedProducts, setSelectedProducts] = useState<
    { product: Product; quantity: number }[]
  >([]);
  const [productInput, setProductInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log('selectedProducts', selectedProducts);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const errors: string[] = [];

    if (!formData.invoice_no) errors.push('Invoice number is required');
    if (!formData.date) errors.push('Date is required');
    if (!formData.customer_name) errors.push('Customer name is required');
    if (!formData.salesperson_name) errors.push('Salesperson name is required');
    if (selectedProducts.length === 0)
      errors.push('At least one product must be selected');
    if (/\d/.test(formData.customer_name))
      errors.push('Customer name cannot contain numbers');
    if (/\d/.test(formData.salesperson_name))
      errors.push('Salesperson name cannot contain numbers');

    setValidationErrors(errors);

    if (errors.length > 0) {
      return;
    }

    dispatch(
      addInvoice({
        ...formData,
        total_amount: selectedProducts.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
        products: selectedProducts.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
        })),
      })
    );

    setIsSubmitted(true);
  };

  const handleProductInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductInput(event.target.value);
    setShowSuggestions(true);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setProductInput(product.name);
    setShowSuggestions(false);
  };

  const handleAddProduct = () => {
    if (selectedProduct) {
      const existingProduct = selectedProducts.find(
        (p) => p.product.id === selectedProduct.id
      );
      if (existingProduct) {
        setSelectedProducts(
          selectedProducts.map((p) =>
            p.product.id === selectedProduct.id
              ? { ...p, quantity: p.quantity + quantity }
              : p
          )
        );
      } else {
        setSelectedProducts([
          ...selectedProducts,
          { product: selectedProduct, quantity },
        ]);
      }
      setProductInput('');
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    setSelectedProducts(
      selectedProducts.filter((p) => p.product.id !== productId)
    );
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleQuantityChangeInList = (
    productId: number,
    newQuantity: number
  ) => {
    setSelectedProducts((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      total_amount: selectedProducts.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    }));
  }, [selectedProducts]);

  useEffect(() => {
    if (success === true && isSubmitted) {
      alert('Invoice submitted successfully!');
      setFormData({
        invoice_no: 0,
        date: '',
        customer_name: '',
        salesperson_name: '',
        payment_type: 'cash',
        notes: '',
        total_amount: 0,
        products: [],
      });
      setSelectedProducts([]);
      setProductInput('');
      setSelectedProduct(null);
      setQuantity(1);
      setIsSubmitted(false);
    }
  }, [success, isSubmitted]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="invoice-form">
      <Link to="/invoice" className="btn-back-link">
        <button className="btn-back">
          <MdArrowBack />
        </button>
      </Link>
      <h1>Create Invoice</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Invoice Number</label>
          <div className="tooltip">
            <input
              type="number"
              name="invoice_no"
              value={formData.invoice_no}
              onChange={handleInputChange}
            />
            {!formData.invoice_no &&
              validationErrors.includes('Invoice number is required') && (
                <span className="tooltiptext">Invoice number is required</span>
              )}
            {formData.invoice_no < 0 &&
              validationErrors.includes('Invoice number cant be minus') && (
                <span className="tooltiptext">
                  Invoice number cant be minus
                </span>
              )}
          </div>
        </div>
        <div>
          <label>Date</label>
          <div className="tooltip">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={1}
            />
            {!formData.date &&
              validationErrors.includes('Date is required') && (
                <span className="tooltiptext">Date is required</span>
              )}
          </div>
        </div>
        <div>
          <label>Customer Name</label>
          <div className="tooltip">
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleInputChange}
            />
            {!formData.customer_name &&
              validationErrors.includes('Customer name is required') && (
                <span className="tooltiptext">Customer name is required</span>
              )}
            {/\d/.test(formData.customer_name) && (
              <span className="tooltiptext">
                Customer name cannot contain numbers
              </span>
            )}
          </div>
        </div>
        <div>
          <label>Salesperson Name</label>
          <div className="tooltip">
            <input
              type="text"
              name="salesperson_name"
              value={formData.salesperson_name}
              onChange={handleInputChange}
            />
            {!formData.salesperson_name &&
              validationErrors.includes('Salesperson name is required') && (
                <span className="tooltiptext">
                  Salesperson name is required
                </span>
              )}
            {/\d/.test(formData.salesperson_name) && (
              <span className="tooltiptext">
                Salesperson name cannot contain numbers
              </span>
            )}
          </div>
        </div>
        <div>
          <label>Payment Type</label>
          <select
            name="payment_type"
            value={formData.payment_type}
            onChange={handleInputChange}
            className="payment-type-select"
          >
            <option className="payment-type-option" value="payment-type-option">
              Cash
            </option>
            <option className="payment-type-option" value="credit">
              Credit
            </option>
          </select>
        </div>
        <div>
          <label>Notes (optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label>Products Sold</label>
          <input
            type="text"
            value={productInput}
            onChange={handleProductInputChange}
            placeholder="Start typing to search products"
          />
          {showSuggestions && (
            <ProductSuggestions
              products={products.filter((p) =>
                p.name.toLowerCase().includes(productInput.toLowerCase())
              )}
              onSelect={handleProductSelect}
            />
          )}
          {selectedProduct && (
            <div className="selected-product">
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={selectedProduct.stock}
              />
              <button type="button" onClick={handleAddProduct}>
                Add Product
              </button>
            </div>
          )}
        </div>
        <SelectedProductsList
          selectedProducts={selectedProducts}
          onQuantityChange={handleQuantityChangeInList}
          onDelete={handleDeleteProduct}
          validationErrors={validationErrors}
        />
        <div>
          <strong>Total Amount: ${formData.total_amount}</strong>
        </div>
        <button className="btn-submit" type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
}

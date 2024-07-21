import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchInvoices } from '../../redux/actions/invoiceActions';
import './PageInvoice.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';

export function Component() {
  const dispatch: AppDispatch = useDispatch();
  const invoices = useSelector((state: RootState) => state.invoice.invoices);
  const meta = useSelector((state: RootState) => state.invoice.meta);

  console.log(invoices);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(window.innerWidth > 768 ? 25 : 10);
  const [hasMore, setHasMore] = useState(true);

  const updatePerPage = () => {
    setPerPage(window.innerWidth > 768 ? 25 : 10);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener('resize', updatePerPage);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('resize', updatePerPage);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchInvoices({ page, per_page: perPage }));
  }, [dispatch, page, perPage]);

  useEffect(() => {
    if (meta.total_pages <= page) {
      setHasMore(false);
    }
  }, [meta.total_pages, page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.offsetHeight
    ) {
      if (hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="invoice-container">
      <h1 className="invoice-header">Invoice List</h1>
      <Link to={`${ROUTES.INVOICE}/add`} className="add-invoice-link">
        <button className="add-invoice-button">Add Invoice</button>
      </Link>
      {invoices.length > 0 ? (
        <div className="invoice-card-container">
          {invoices.map((invoice) => (
            <div className="invoice-card" key={invoice.id}>
              <h2 className="invoice-no">{invoice.invoice_no}</h2>
              <p className="invoice-customer">
                Customer: {invoice.customer_name}
              </p>
              <p className="invoice-salesperson">
                Salesperson: {invoice.salesperson_name}
              </p>
              <p className="invoice-amount">
                Total Amount Paid: ${invoice.total_amount}
              </p>
              <p className="invoice-notes">Notes: {invoice.notes}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-invoices">No invoices found.</p>
      )}
    </div>
  );
}

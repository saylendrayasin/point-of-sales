import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Config from '../../config';
import { setInvoices, setStatistics } from '../reducers/invoiceReducer';

export interface Invoice {
  id?: number;
  invoice_no: number;
  date: string;
  customer_name: string;
  salesperson_name: string;
  payment_type: string;
  notes?: string;
  total_amount: number;
  products: any;
}

export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async (params: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(Config.apiUrl('/invoice'), { params });
      if (response.data.data) {
        dispatch(
          setInvoices({
            invoices: response.data.data,
            meta: response.data.meta,
          })
        );
        return {
          data: response.data.data,
          meta: response.data.meta,
          page: params.page,
        };
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(
        (error as any).response?.data?.message || 'An error occurred'
      );
    }
  }
);

export const fetchStatistics = createAsyncThunk(
  'invoices/fetchStatistics',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(Config.apiUrl('/invoice/statistics'));
      if (response.data.data) {
        dispatch(setStatistics(response.data.data));
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(
        (error as any).response?.data?.message || 'An error occurred'
      );
    }
  }
);

export const addInvoice = createAsyncThunk(
  'invoices/addInvoice',
  async (invoiceData: Invoice, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(Config.apiUrl('/invoice'), invoiceData);
      if (response.data.data) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      const message =
        (error as any).response?.data?.message || 'An error occurred';
      console.error('Error message:', message);
      return rejectWithValue(message);
    }
  }
);

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchInvoices,
  addInvoice,
  fetchStatistics,
} from '../actions/invoiceActions';
import { Invoice } from '../actions/invoiceActions';

interface InvoiceState {
  invoices: Invoice[];
  meta?: any;
  loading: boolean;
  error: string | null;
  success: boolean;
  statistics?: any;
}

const initialState: InvoiceState = {
  invoices: [],
  statistics: [],
  meta: {},
  loading: false,
  error: null,
  success: false,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoices(
      state,
      action: PayloadAction<{
        invoices: Invoice[];
        meta: { countData: number; countTotalPage: number };
      }>
    ) {
      const newInvoices = action.payload.invoices.filter(
        (newInvoice) =>
          !state.invoices.some(
            (existingInvoice) => existingInvoice.id === newInvoice.id
          )
      );
      state.invoices = [...state.invoices, ...newInvoices];
      state.meta = action.payload.meta;
    },

    setStatistics(state, action: PayloadAction<any>) {
      state.statistics = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        const newInvoices = action.payload.data.filter(
          (newInvoice: Invoice) =>
            !state.invoices.some(
              (existingInvoice) => existingInvoice.id === newInvoice.id
            )
        );
        state.invoices = [...state.invoices, ...newInvoices];
        state.meta = action.payload.meta;
        state.success = true;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(addInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.loading = false;
        if (
          !state.invoices.some((invoice) => invoice.id === action.payload.id)
        ) {
          state.invoices.push(action.payload);
        }
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setInvoices, setStatistics } = invoiceSlice.actions;
export default invoiceSlice.reducer;

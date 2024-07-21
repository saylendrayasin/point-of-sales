import add from './add';
import getInvoiceById from './get';
import updateInvoiceById from './update';
import deleteInvoiceById from './remove';
import searchInvoice from './search';
import getStatistics from './get-stat';

const invoiceController = {
  addInvoice: add.addInvoice,
  addBulkInvoice: add.addBulkInvoice,
  getInvoiceById,
  updateInvoiceById,
  deleteInvoiceById,
  searchInvoice,
  getStatistics,
};

export default invoiceController;

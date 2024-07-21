import express from 'express';
import invoiceController from '../controllers/invoice';

const routerInvoice = express.Router();

routerInvoice.get('/', invoiceController.searchInvoice);
routerInvoice.get('/statistics', invoiceController.getStatistics);
routerInvoice.get('/:id', invoiceController.getInvoiceById);
routerInvoice.post('/', invoiceController.addInvoice);
routerInvoice.post('/bulk', invoiceController.addBulkInvoice);
routerInvoice.patch('/:id', invoiceController.updateInvoiceById);
routerInvoice.delete('/:id', invoiceController.deleteInvoiceById);

export default routerInvoice;

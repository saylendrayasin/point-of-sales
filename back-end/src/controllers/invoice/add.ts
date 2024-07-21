import prisma from '../../database';

interface InvoiceCreateInput {
  invoice_no: number;
  date: Date;
  customer_name: string;
  salesperson_name: string;
  payment_type: string;
  notes: string;
  total_amount: number;
}

const addInvoice = async (req, res) => {
  try {
    let {
      invoice_no,
      date,
      customer_name,
      salesperson_name,
      payment_type,
      notes,
      total_amount,
      products,
    } = req.body;

    let dateConverted = new Date(date);

    if (typeof invoice_no === 'string') {
      invoice_no = parseInt(invoice_no);
    }

    const invoice = await prisma.invoice.create({
      data: {
        invoice_no,
        date: dateConverted,
        customer_name,
        salesperson_name,
        payment_type,
        notes,
        total_amount,
        products: products || [],
      },
    });
    res.status(201).json({ data: invoice });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Failed to add invoice',
      error,
    });
  }
};

const addBulkInvoice = async (req, res) => {
  try {
    let { invoices } = req.body;

    let invoicesData = invoices.map((invoice) => {
      let {
        invoice_no,
        date,
        customer_name,
        salesperson_name,
        payment_type,
        notes,
        total_amount,
      } = invoice;

      let dateConverted = new Date(date);

      if (typeof invoice_no === 'string') {
        invoice_no = parseInt(invoice_no);
      }

      return {
        invoice_no,
        date: dateConverted,
        customer_name,
        salesperson_name,
        payment_type,
        notes,
        total_amount,
      };
    });

    const invoice = await prisma.invoice.createMany({
      data: invoicesData,
    });
    res.status(201).json({ data: invoice });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Failed to add invoice',
      error,
    });
  }
};

const add = {
  addInvoice,
  addBulkInvoice,
};

export default add;

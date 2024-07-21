import prisma from '../../database';

const updateInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      invoice_no,
      date,
      customer_name,
      salesperson_name,
      payment_type,
      notes,
      total_amount,
    } = req.body;
    const invoice = await prisma.invoice.update({
      where: {
        id: parseInt(id),
      },
      data: {
        invoice_no,
        date,
        customer_name,
        salesperson_name,
        payment_type,
        notes,
        total_amount,
      },
    });
    res.status(200).json({ data: invoice });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Failed to update invoice',
      error,
    });
  }
};

export default updateInvoiceById;

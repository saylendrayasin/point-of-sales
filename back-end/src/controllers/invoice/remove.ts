import prisma from '../../database';

const deleteInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await prisma.invoice.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ data: invoice });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Failed to delete invoice',
      error,
    });
  }
};

export default deleteInvoiceById;

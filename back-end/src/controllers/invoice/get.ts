import prisma from '../../database';

const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ data: invoice });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Failed to get invoice',
      error,
    });
  }
};

export default getInvoiceById;

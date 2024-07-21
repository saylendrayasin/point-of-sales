import prisma from '../../database';

const getStatistics = async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany();

    const groupedData = invoices.reduce((acc, invoice) => {
      const key = new Date(invoice.date).toISOString().split('T')[0];

      if (!acc[key]) {
        acc[key] = { x: key, y: 0 };
      }
      acc[key].y += invoice.total_amount;

      return acc;
    }, {});

    const mappedData = Object.values(groupedData);

    res.status(200).json({ data: mappedData });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Failed to get invoice',
      error,
    });
  }
};

export default getStatistics;

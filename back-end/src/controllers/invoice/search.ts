import prisma from '../../database';

const searchInvoice = async (req, res) => {
  try {
    const { page, per_page } = req.query;
    const pageNumber = parseInt(page);
    const perPage = parseInt(per_page);

    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(perPage) || perPage < 1) {
      return res.status(400).json({
        status: false,
        message: 'Invalid page or per_page parameter',
      });
    }

    const totalInvoices = await prisma.invoice.count();
    const invoices = await prisma.invoice.findMany({
      take: perPage,
      skip: (pageNumber - 1) * perPage,
    });

    res.status(200).json({
      status: true,
      data: invoices,
      meta: {
        total: totalInvoices,
        page: pageNumber,
        per_page: perPage,
        total_pages: Math.ceil(totalInvoices / perPage),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to get invoices',
      error,
    });
  }
};

export default searchInvoice;

import axios from 'axios';
import Config from '../../config';

const search = async (params: any) => {
  let status = false;
  let message = '';
  let data: any = {};

  try {
    const req = await axios.get(Config.apiUrl(`/invoice`), {
      params,
    });

    status = req.data.status;
    message = req.data.message;
    data = req.data.data;
  } catch (err) {
    message = (err as any)?.response?.data?.message;
  }

  return {
    status,
    message,
    data,
  };
};

const ApiInvoice = {
  search,
};

export default ApiInvoice;

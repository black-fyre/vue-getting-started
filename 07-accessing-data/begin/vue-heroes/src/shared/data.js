import * as axios from 'axios';
import { format } from 'date-fns';
import { inputDateFormat } from './constants';
import { API } from './config';

const getHeroes = async function() {
  try {
    const response = await axios.get(`${API}/heroes.json`);
    let data = parseList(response);
    return data.map(h => {
      h.originDate = format(h.originDate, inputDateFormat);
      return h;
    });
  } catch (e) {
    console.error(e);
    return [];
  }
};

const parseList = response => {
  if (response.status !== 200) {
    throw Error(response.message);
  }
  if (!response.data) {
    return [];
  }
  if (typeof response.data !== 'object') {
    return [];
  }
  return response.data;
};

export const data = {
  getHeroes,
};

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../plugin/context';

export const readCupom = createAsyncThunk('readCupom', async (cupomFiscal) => {
  const response = await axios.post(baseUrl + '/cupom/read', cupomFiscal)
  return response.data;
});

export default { readCupom };

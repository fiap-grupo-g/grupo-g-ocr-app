import { configureStore } from '@reduxjs/toolkit';

import cupomFiscal from './reducers/cupomFiscal';

export default configureStore({
  reducer: {
    cupomFiscal,
  },
});

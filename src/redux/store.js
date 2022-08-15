import { configureStore } from '@reduxjs/toolkit';
import { authSlice,registerSlice} from './auth';


export const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    auth: authSlice.reducer,
  },
})
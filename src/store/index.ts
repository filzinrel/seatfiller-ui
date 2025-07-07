import { configureStore } from '@reduxjs/toolkit';
import hudReducer from '../features/hud/hudSlice';

export const store = configureStore({
  reducer: {
    hud: hudReducer
  }
});

// Types for useDispatch and useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import GameReducer from './Game/GameSlice';

export const store = configureStore({
  reducer: {
    game: GameReducer,
  },
});

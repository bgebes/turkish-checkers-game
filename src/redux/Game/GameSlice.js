import { createSlice } from '@reduxjs/toolkit';
import { initialSquares } from '../../assets/initials/initialSquares';
import { GameReducers } from './GameReducers';

export const GameSlice = createSlice({
  name: 'game',
  initialState: {
    status: {
      signal: 'Ready to Play!',
      turn: 'Blue',
    },
    squares: {
      focused: {},
      arounds: {},
      availabilities: [],
      all: initialSquares,
    },
    movements: [],
  },
  reducers: GameReducers,
});

export const { focusSquare, handleMovement, resetGame } = GameSlice.actions;
export default GameSlice.reducer;

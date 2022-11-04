import { createSlice } from '@reduxjs/toolkit';
import { squaresMock } from '../../assets/mocks/squaresMock';

export const GameSlice = createSlice({
  name: 'game',
  initialState: {
    status: {
      signal: '',
      turn: {},
    },
    squares: {
      focused: {},
      availables: [],
      all: squaresMock,
    },
    movements: {
      player1: [],
      player2: [],
    },
  },
  reducers: {
    focusSquare: (state, action) => {},
    handleAvailables: (state, action) => {},
    handleMovement: (state, action) => {},
  },
});

export const { focusSquare, handleAvailables, handleMovement } =
  GameSlice.actions;
export default GameSlice.reducer;

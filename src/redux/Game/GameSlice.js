import { createSlice } from '@reduxjs/toolkit';
import { initialSquares } from '../../assets/initials/initialSquares';

export const GameSlice = createSlice({
  name: 'game',
  initialState: {
    status: {
      signal: '',
      turn: {},
    },
    squares: {
      focused: {},
      availabilities: [],
      all: initialSquares,
    },
    movements: {
      player1: [],
      player2: [],
    },
  },
  reducers: {
    focusSquare: (state, action) => {
      state.squares.focused = { ...action.payload.focused, dama: true };
    },
    handleAvailabilities: (state, action) => {
      state.squares.availabilities = action.payload.availabilities;
    },
    handleMovement: (state, action) => {},
  },
});

export const { focusSquare, handleAvailabilities, handleMovement } =
  GameSlice.actions;
export default GameSlice.reducer;

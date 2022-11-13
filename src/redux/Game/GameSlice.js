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
      state.squares.focused = action.payload.focused;
    },
    handleAvailabilities: (state, action) => {
      state.squares.availabilities = action.payload.availabilities;
    },
    handleMovement: (state, action) => {
      const { x, y } = action.payload.newPosition;
      const { focused } = state.squares;

      const focusedSquare = state.squares.all.find(
        (s, _) => JSON.stringify(s) == JSON.stringify(focused)
      );

      const moveSquare = state.squares.all.find(
        (s, _) => JSON.stringify(s.position) == JSON.stringify({ x, y })
      );

      moveSquare.checker = focusedSquare.checker;
      focusedSquare.checker = null;
      [moveSquare.dama, focusedSquare.dama] = [
        focusedSquare.dama,
        moveSquare.dama,
      ];

      state.squares.focused = {};
      state.squares.availabilities = [];
    },
  },
});

export const { focusSquare, handleAvailabilities, handleMovement } =
  GameSlice.actions;
export default GameSlice.reducer;

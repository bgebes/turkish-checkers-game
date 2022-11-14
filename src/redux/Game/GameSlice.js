import { createSlice } from '@reduxjs/toolkit';
import { initialSquares } from '../../assets/initials/initialSquares';

export const GameSlice = createSlice({
  name: 'game',
  initialState: {
    status: {
      signal: 'Ready to Play!',
      turn: 'Blue',
    },
    squares: {
      focused: {},
      availabilities: [],
      all: initialSquares,
    },
    movements: [],
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
      const focusedPosition = focused.position;

      const focusedSquare = state.squares.all.find(
        (s, _) => JSON.stringify(s.position) == JSON.stringify(focusedPosition)
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

      const { turn } = state.status;

      state.movements.push({
        from: { x: focusedPosition.x, y: focusedPosition.y },
        to: { x, y },
        author: turn,
      });

      state.status.turn = turn === 'Blue' ? 'Red' : 'Blue';
      state.status.signal = `It's your turn ${state.status.turn}!`;

      state.squares.focused = {};
      state.squares.availabilities = [];
    },
    resetGame: (state, _) => {
      state.status = {
        signal: 'Ready to Play!',
        turn: 'Blue',
      };

      state.squares = {
        focused: {},
        availabilities: [],
        all: initialSquares,
      };

      state.movements = [];
    },
  },
});

export const { focusSquare, handleAvailabilities, handleMovement, resetGame } =
  GameSlice.actions;
export default GameSlice.reducer;

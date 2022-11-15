import { createSlice } from '@reduxjs/toolkit';
import { destroyChecker } from '../../actions/actions';
import { initialSquares } from '../../assets/initials/initialSquares';
import { checkObjectEqualities } from '../../utils/utils';

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
  reducers: {
    focusSquare: (state, action) => {
      state.squares.focused = action.payload.focused;
    },
    handleArounds: (state, action) => {
      state.squares.arounds = action.payload.arounds;
    },
    handleAvailabilities: (state, action) => {
      state.squares.availabilities = action.payload.availabilities;
    },
    handleMovement: (state, action) => {
      const { moved, directionedArounds } = action.payload;
      const { focused } = state.squares;

      const focusedSquare = state.squares.all.find((s, _) =>
        checkObjectEqualities(s.position, focused.position)
      );

      const moveSquare = state.squares.all.find((s, _) =>
        checkObjectEqualities(s, moved)
      );

      moveSquare.checker = focusedSquare.checker;
      focusedSquare.checker = null;
      [moveSquare.dama, focusedSquare.dama] = [
        focusedSquare.dama,
        moveSquare.dama,
      ];

      const processResult = destroyChecker(
        moved,
        directionedArounds,
        state.squares.all
      );

      const { turn } = state.status;

      state.movements.push({
        from: { x: focused.position.x, y: focused.position.y },
        to: { x: moved.position.x, y: moved.position.y },
        author: turn,
        destroy: processResult,
      });

      if (!processResult) {
        state.status.turn = turn === 'Blue' ? 'Red' : 'Blue';
        state.status.signal = `It's your turn ${state.status.turn}!`;
      }

      state.squares.focused = {};
      state.squares.arounds = {};
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

export const {
  focusSquare,
  handleArounds,
  handleAvailabilities,
  handleMovement,
  resetGame,
} = GameSlice.actions;
export default GameSlice.reducer;

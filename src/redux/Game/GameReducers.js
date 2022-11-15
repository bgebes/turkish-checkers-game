import { destroyChecker, upgradeToDama } from '../../actions/actions';
import { checkObjectEqualities } from '../../utils/utils';

export const GameReducers = {
  focusSquare: (state, action) => {
    const { focused, arounds, availabilities } = action.payload;

    state.squares.focused = focused;
    state.squares.arounds = arounds;
    state.squares.availabilities = availabilities;
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

    if (moved.position.y === 8 && !focused.dama) {
      upgradeToDama(moveSquare, state.squares.all);
    }

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
};

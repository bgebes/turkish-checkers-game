import { store } from '../redux/store';
import { useSelector } from 'react-redux';
import { focusSquare, handleMovement } from '../redux/Game/GameSlice';
import {
  getArounds,
  getAvailabilities,
  movement,
  checkObjectEqualities,
} from '../utils/utils';

export const getGameState = () => useSelector((state) => state.game);
export const getGameStateByStore = () => store.getState().game;

export const handleClickSquare = (clickedSquare) => {
  const { turn } = getGameStateByStore().status;

  const wrongClick1 = turn === 'Blue' && clickedSquare.checker === 'red';
  const wrongClick2 = turn === 'Red' && clickedSquare.checker === 'blue';

  if (wrongClick1 || wrongClick2) return;

  if (clickedSquare.checker !== null) {
    const { arounds, availabilities } = checkAvailables({
      focused: clickedSquare,
    });

    store.dispatch(
      focusSquare({ focused: clickedSquare, arounds, availabilities })
    );
  } else {
    const moveCallback = (directionedArounds) =>
      store.dispatch(
        handleMovement({ moved: clickedSquare, directionedArounds })
      );

    movement(clickedSquare, moveCallback);
  }
};

export const checkAvailables = ({ focused }) => {
  const Direction = {
    Top: 'Top',
    Bottom: 'Bottom',
    Left: 'Left',
    Right: 'Right',
  };

  const arounds = {
    Left: getArounds(focused, Direction.Left),
    Top: getArounds(focused, Direction.Top),
    Right: getArounds(focused, Direction.Right),
    Bottom: getArounds(focused, Direction.Bottom),
  };

  const availabilities = [
    ...getAvailabilities(focused, arounds.Left),
    ...getAvailabilities(focused, arounds.Top),
    ...getAvailabilities(focused, arounds.Right),
    ...getAvailabilities(focused, arounds.Bottom),
  ];

  return { arounds, availabilities };
};

export const destroyChecker = (moved, directionedArounds, all) => {
  let counter = 0;

  for (const _square of directionedArounds) {
    if (checkObjectEqualities(_square, moved)) break;

    const __square = all.find((s, _) => checkObjectEqualities(s, _square));
    if (__square.checker !== null) {
      __square.checker = null;
      __square.dama = false;
      counter++;
    }
  }

  return counter > 0;
};

export const upgradeToDama = (moved, all) => {
  const _square = all.find((s, _) => checkObjectEqualities(s, moved));

  if (_square) {
    _square.dama = true;
  }
};

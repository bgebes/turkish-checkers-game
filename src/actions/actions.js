import { store } from '../redux/store';
import { useSelector } from 'react-redux';
import {
  focusSquare,
  handleAvailabilities,
  handleMovement,
} from '../redux/Game/GameSlice';
import { getArounds, getAvailabilities, movement } from '../utils/utils';

export const getGameState = () => useSelector((state) => state.game);
export const getGameStateByStore = () => store.getState().game;
export const dispatch = store.dispatch;

export const handleClickSquare = (clickedSquare) => {
  const { turn } = getGameStateByStore().status;

  const wrongClick1 = turn === 'Blue' && clickedSquare.checker === 'red';
  const wrongClick2 = turn === 'Red' && clickedSquare.checker === 'blue';

  if (wrongClick1 || wrongClick2) return;

  if (clickedSquare.checker !== null) {
    dispatch(focusSquare({ focused: clickedSquare }));
    checkAvailables({ focused: clickedSquare });
  } else {
    movement(clickedSquare, (x, y) =>
      dispatch(handleMovement({ newPosition: { x, y } }))
    );
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

  dispatch(handleAvailabilities({ availabilities }));
};

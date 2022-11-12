import { store } from '../redux/store';
import { useSelector } from 'react-redux';
import { focusSquare, handleAvailabilities } from '../redux/Game/GameSlice';

export const getGameState = () => useSelector((state) => state.game);
export const getGameStateByStore = () => store.getState().game;
export const dispatch = store.dispatch;

export const handleClickSquare = (focused) => {
  dispatch(focusSquare({ focused }));
  checkAvailables(focused);
};

export const checkAvailables = (focused) => {
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

  function getAvailabilities(focused, arounds) {
    const temp = new Set();
    const enemyColor = focused.checker === 'red' ? 'blue' : 'red';

    for (let i = 0; i < arounds.length; i++) {
      const square = arounds[i];
      const beforeSquare = arounds[i - 1],
        nextSquare = arounds[i + 1];

      const isBeforeAvailable = beforeSquare && beforeSquare.checker === null;
      const isNextAvailable = nextSquare && nextSquare.checker === null;
      const isOnOwnChecker = square.checker === focused.checker;
      const isOnEnemyChecker = square.checker === enemyColor;

      if (isOnOwnChecker) {
        break;
      } else if (square.checker === null && nextSquare) {
        temp.add(square);
        break;
      } else if (
        !focused.dama &&
        isOnEnemyChecker &&
        isBeforeAvailable &&
        isNextAvailable
      ) {
        temp.add(nextSquare);
      } else if (
        focused.dama &&
        isOnEnemyChecker &&
        isBeforeAvailable &&
        isNextAvailable
      ) {
        arounds
          .filter((_, j) => j > i)
          .forEach((subSquare, _) => {
            if (subSquare.checker == null) {
              temp.add(subSquare);
            }
          });
      }
    }

    return temp;
  }

  function getArounds(square, direction) {
    if (square === undefined) return;

    const charArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const { all } = getGameStateByStore().squares;

    const nextToSquare = (() => {
      switch (direction) {
        case Direction.Left:
          return all.find(
            (s) =>
              s.position.x ===
                charArr[charArr.indexOf(square.position.x) - 1] &&
              s.position.y === square.position.y
          );
        case Direction.Top:
          return all.find(
            (s) =>
              s.position.x === square.position.x &&
              s.position.y === square.position.y + 1
          );
        case Direction.Right:
          return all.find(
            (s) =>
              s.position.x ===
                charArr[charArr.indexOf(square.position.x) + 1] &&
              s.position.y === square.position.y
          );
        case Direction.Bottom:
          return all.find(
            (s) =>
              s.position.x === square.position.x &&
              s.position.y === square.position.y - 1
          );
        default:
          return undefined;
      }
    })();

    return nextToSquare
      ? [nextToSquare, ...getArounds(nextToSquare, direction)]
      : [];
  }
};

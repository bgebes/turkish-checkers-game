import { getGameStateByStore } from '../actions/actions';

export function getAvailabilities(focused, arounds) {
  const temp = new Set();
  const enemyColor = focused.checker === 'red' ? 'blue' : 'red';

  const square = arounds[0],
    nextSquare = arounds[1];

  const isCurrentAvailable = square && square.checker === null;
  const isNextAvailable = nextSquare && nextSquare.checker === null;
  const isOnOwnChecker = square && square.checker === focused.checker;
  const isOnEnemyChecker = square && square.checker === enemyColor;

  if (isOnOwnChecker) {
    return [];
  }

  if (!focused.dama) {
    if (isCurrentAvailable) {
      temp.add(square);
    } else if (isOnEnemyChecker && isNextAvailable) {
      temp.add(nextSquare);
    }
  } else {
    for (const [_index, _square] of arounds.entries()) {
      const _nextSquare = arounds[_index + 1];

      const positiveStateBasic = _square.checker === null;
      const positiveStateAdvanced =
        _square &&
        _square.checker !== null &&
        _nextSquare &&
        _nextSquare.checker === null;

      const undesiredState =
        _square &&
        _square.checker !== null &&
        _nextSquare &&
        _nextSquare.checker !== null;

      if (undesiredState) break;

      if (positiveStateBasic) {
        temp.add(_square);
      } else if (positiveStateAdvanced) {
        temp.add(_nextSquare);
      }
    }
  }

  return [...temp];
}

export function getArounds(square, direction) {
  if (square === undefined) return;

  const charArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const { all } = getGameStateByStore().squares;

  const nextToSquare = (() => {
    switch (direction) {
      case 'Left':
        return all.find(
          (s) =>
            s.position.x === charArr[charArr.indexOf(square.position.x) - 1] &&
            s.position.y === square.position.y
        );
      case 'Top':
        return all.find(
          (s) =>
            s.position.x === square.position.x &&
            s.position.y === square.position.y + 1
        );
      case 'Right':
        return all.find(
          (s) =>
            s.position.x === charArr[charArr.indexOf(square.position.x) + 1] &&
            s.position.y === square.position.y
        );
      case 'Bottom':
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

export function movement(clickedSquare, callback) {
  const { x, y } = clickedSquare.position;
  const { focused, availabilities } = getGameStateByStore().squares;
  const isClickedSquareInArray = availabilities.some(
    (a, _) => JSON.stringify(a) === JSON.stringify(clickedSquare)
  );

  if (focused && isClickedSquareInArray) callback(x, y);
}

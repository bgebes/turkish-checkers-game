import React from 'react';
import checkers_red from '../../assets/checkers/checkers_red.png';
import checkers_blue from '../../assets/checkers/checkers_blue.png';
import { Center, Image } from '@chakra-ui/react';
import { getGameState, handleClickSquare } from '../../actions/actions';

function Square({ bgColor, position, checker, dama }) {
  const { focused, availabilities } = getGameState().squares;

  const colors = {
    focused: 'orange.200',
    available: 'green.500',
  };

  let checkerIcon;
  switch (checker) {
    case 'red':
      checkerIcon = checkers_red;
      break;
    case 'blue':
      checkerIcon = checkers_blue;
      break;
    default:
  }

  let bg;
  if (focused.position == position) {
    bg = colors.focused;
  } else if (availabilities.some((square) => square.position == position)) {
    bg = colors.available;
  } else {
    bg = bgColor;
  }

  return (
    <Center
      bg={bg}
      h="75px"
      w="75px"
      border={bg === colors.available ? '1px' : null}
      onClick={() => {
        handleClickSquare({ bgColor, position, checker, dama });
      }}
    >
      <Image src={checkerIcon} />
    </Center>
  );
}

export default Square;

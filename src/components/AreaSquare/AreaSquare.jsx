import React from 'react';
import { Center, Image } from '@chakra-ui/react';
import checkers_red from '../../assets/checkers/checkers_red.png';
import checkers_blue from '../../assets/checkers/checkers_blue.png';

function AreaSquare({ bgColor, position, checker }) {
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

  return (
    <Center bg={bgColor} h="75px" w="75px">
      <Image src={checkerIcon} />
    </Center>
  );
}

export default AreaSquare;

import { Box, Center, Text } from '@chakra-ui/react';
import React from 'react';

function EndView({ winner }) {
  const Colors = {
    font: {
      red: 'red.500',
      blue: 'blue.500',
    },
    bg: {
      red: 'red.100',
      blue: 'blue.100',
    },
  };

  const fontColor = winner === 'red' ? Colors.font.red : Colors.font.blue;
  const bgColor = winner === 'red' ? Colors.bg.red : Colors.bg.blue;

  return (
    <Box bg={bgColor} py="5">
      <Center>
        <Text color={fontColor} fontSize="4xl">
          {winner} win!
        </Text>
      </Center>
    </Box>
  );
}

export default EndView;

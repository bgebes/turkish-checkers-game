import React from 'react';
import { Stack, Text } from '@chakra-ui/react';

function Numbers() {
  const numbersArr = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Stack justify="space-evenly" me="5" pt="3">
      {numbersArr.map((number, i) => {
        return (
          <Text fontSize="4xl" key={i}>
            {number}
          </Text>
        );
      })}
    </Stack>
  );
}

export default Numbers;

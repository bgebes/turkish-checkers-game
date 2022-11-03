import React from 'react';
import { Stack, Text } from '@chakra-ui/react';

function Numbers() {
  const numbersArr = [8, 7, 6, 5, 4, 3, 2, 1];

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

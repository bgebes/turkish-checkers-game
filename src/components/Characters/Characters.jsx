import React from 'react';
import { Stack, Text } from '@chakra-ui/react';

function Characters() {
  const charArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  return (
    <Stack direction="row" justify="space-evenly" ps="10">
      {charArr.map((char, i) => {
        return (
          <Text fontSize="4xl" key={i}>
            {char}
          </Text>
        );
      })}
    </Stack>
  );
}

export default Characters;

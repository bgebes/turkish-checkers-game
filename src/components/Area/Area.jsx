import React from 'react';
import Square from '../Square/Square';
import Numbers from '../Numbers/Numbers';
import Characters from '../Characters/Characters';
import Movements from '../Movements/Movements';
import { Box, SimpleGrid, Stack } from '@chakra-ui/react';
import { getGameState } from '../../actions/actions';

function Area() {
  const { all } = getGameState().squares;

  return (
    <Stack direction="row">
      <Stack direction="column">
        <Stack direction="row">
          <Numbers />
          <Box p="4" border="1px" boxShadow="2xl">
            <SimpleGrid columns={8} border="1px">
              {all.map((props, i) => {
                return <Square key={i} {...props} />;
              })}
            </SimpleGrid>
          </Box>
        </Stack>
        <Characters />
      </Stack>
      <Movements />
    </Stack>
  );
}

export default Area;

import React from 'react';
import { Box, SimpleGrid, Stack } from '@chakra-ui/react';
import AreaSquare from '../AreaSquare/AreaSquare';
import Numbers from '../Numbers/Numbers';
import Characters from '../Characters/Characters';

/* temporary */
import { mock } from './mock';

function Area() {
  return (
    <Stack>
      <Stack direction="row">
        <Numbers />
        <Box p="4" border="1px">
          <SimpleGrid columns={8} border="1px">
            {mock.map((props, i) => {
              return <AreaSquare key={i} {...props} />;
            })}
          </SimpleGrid>
        </Box>
      </Stack>
      <Characters />
    </Stack>
  );
}

export default Area;

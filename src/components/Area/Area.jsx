import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import AreaSquare from '../AreaSquare/AreaSquare';

/* temporary */
import { mock } from './mock';

function Area() {
  return (
    <SimpleGrid columns={8} border="1px">
      {mock.map((props, i) => {
        return <AreaSquare key={i} {...props} />;
      })}
    </SimpleGrid>
  );
}

export default Area;

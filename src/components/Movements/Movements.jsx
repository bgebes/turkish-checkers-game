import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Text,
  Box,
} from '@chakra-ui/react';
import ResetButton from '../ResetButton/ResetButton';
import { getGameState } from '../../actions/actions';

function Movements() {
  const { movements, status } = getGameState();

  const movementsTable = (
    <TableContainer w="xl" boxShadow="xl" overflowY="auto" maxHeight="xl">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Round</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Author</Th>
          </Tr>
        </Thead>
        <Tbody>
          {movements.map(({ from, to, author }, index) => {
            return (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>
                  ({from.x},{from.y})
                </Td>
                <Td>
                  ({to.x},{to.y})
                </Td>
                <Td>{author}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );

  return (
    <Box ps="8">
      <Stack>
        <Stack direction="row" justify="space-between">
          <Text fontSize="xl" fontWeight="bold">
            Movements
          </Text>
          <Text>{status.signal}</Text>
          <ResetButton />
        </Stack>
        {movementsTable}
      </Stack>
    </Box>
  );
}

export default Movements;

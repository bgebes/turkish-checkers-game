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
import EndView from '../EndView/EndView';
import ResetButton from '../ResetButton/ResetButton';
import { getGameState } from '../../actions/actions';
import { useEffect } from 'react';
import { store } from '../../redux/store';
import { finishGame } from '../../redux/Game/GameSlice';

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

  const { all } = getGameState().squares;
  const checkersCount = {
    red: all.filter((s, _) => s.checker === 'red').length,
    blue: all.filter((s, _) => s.checker === 'blue').length,
  };

  const isGameFinished = checkersCount.red === 0 || checkersCount.blue === 0;

  let winner;
  if (checkersCount.red === 0) {
    winner = 'Blue';
  } else if (checkersCount.blue === 0) {
    winner = 'Red';
  } else {
    winner = 'Anyone yet';
  }

  useEffect(() => {
    if (isGameFinished) {
      store.dispatch(finishGame());
    }
  }, [isGameFinished]);

  return (
    <Box ps="8">
      <Stack>
        {isGameFinished && <EndView winner={winner} />}
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

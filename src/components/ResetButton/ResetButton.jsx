import React from 'react';
import { Button } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { resetGame } from '../../redux/Game/GameSlice';
import { store } from '../../redux/store';

function ResetButton() {
  const handleReset = () => {
    store.dispatch(resetGame());
  };

  return (
    <Button
      leftIcon={<RepeatIcon />}
      colorScheme="green"
      variant="solid"
      size="sm"
      onClick={handleReset}
    >
      Restart Game
    </Button>
  );
}

export default ResetButton;

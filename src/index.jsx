import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ReduxProvider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ReduxProvider>
);

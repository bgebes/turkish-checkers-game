import { store } from '../redux/store';
import { useSelector } from 'react-redux';

export const getGameState = () => useSelector((state) => state.game);
export const getGameStateByStore = () => store.getState().game;

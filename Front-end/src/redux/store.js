import { createStore } from 'redux';
import flagsReducer from './redux';

const store = createStore(flagsReducer);

export default store;
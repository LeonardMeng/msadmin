/**
 * Created by KanadeM on 16/1/2024
 */
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

export default store;

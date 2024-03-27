// store.ts
import { configureStore, Action, Middleware } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import {thunk} from 'redux-thunk';
import { useDispatch } from 'react-redux';
import todosReducer from './reducers/todos';

const loggerMiddleware: Middleware = store => next => action => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', store.getState());
  return result;
};

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware: (gDM) => gDM().concat([thunk, loggerMiddleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, null, Action<string>>;

export default store;

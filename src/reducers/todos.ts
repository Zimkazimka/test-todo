// reducers/todos.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from '../store';
import axios from 'axios';

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodoList {
  todos: Todo[]
}

interface TodosState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        // Добавляем запрос к серверу при изменении статуса айтема
        axios.patch(`https://dummyjson.com/todos/${todo.id}`, { completed: todo.completed });
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
      axios.delete(`https://dummyjson.com/todos/${action.payload}`);
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {addTodo, toggleTodo, setTodos, setLoading, setError, deleteTodo} = todosSlice.actions;

export const fetchTodos = (): AppThunk => async dispatch => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get<TodoList>('https://dummyjson.com/todos/user/1');
    dispatch(setTodos(response.data.todos));
  } catch (error) {
    // @ts-ignore
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

interface CreateTodoData {
  todo: string;
  completed: boolean;
  userId: number;
}

export const createTodo = (todoData: CreateTodoData): AppThunk => async dispatch => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post<Todo>('https://dummyjson.com/todos/add', todoData);
    dispatch(addTodo(response.data));
  } catch (error) {
    // @ts-ignore
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default todosSlice.reducer;

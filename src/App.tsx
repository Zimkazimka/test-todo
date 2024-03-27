// App.tsx
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { fetchTodos } from './reducers/todos';
import store from './store';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  useEffect(() => {
    // @ts-ignore
    store.dispatch(fetchTodos());
  }, []);

  return (
    <Provider store={store}>
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold mb-4">Todo List</h1>
        <AddTodoForm />
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;

// components/TodoList.tsx
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.items);

  const memoizedTodoItems = useMemo(() => {
    return todos.map(todo => <TodoItem key={todo.id} todo={todo} />);
  }, [todos]);

  return (
    <ul className="mt-4">
      {memoizedTodoItems}
    </ul>
  );
};

export default TodoList;

// components/TodoItem.tsx
import React, {useCallback, useState} from 'react';
import { useDispatch } from 'react-redux';
import {deleteTodo, Todo} from '../reducers/todos';
import { toggleTodo } from '../reducers/todos';
import axios from "axios";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.todo);
  const dispatch = useDispatch();

  const handleToggle = useCallback(() => {
    dispatch(toggleTodo(todo.id));
  }, [dispatch, todo.id]);

  const handleDelete = useCallback(() => {
    dispatch(deleteTodo(todo.id));
  }, [dispatch, todo.id]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const response = await axios.put(`https://dummyjson.com/todos/${todo.id}`, { todo: editedText });
      if (response.status === 200) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  }, [editedText, todo.id]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  }, []);

  return (
    <li className={`flex items-center justify-between p-2 ${todo.completed ? 'bg-green-100' : 'bg-gray-100'} border-b border-gray-200`}>
      <div className="flex-grow flex-nowrap">
        {isEditing ? (
          <>
            <input type="text" value={editedText} onChange={handleChange} className="w-9/12 p-1 border border-gray-300 rounded mr-2" />
            <button onClick={handleSave} className="px-2 py-1 bg-blue-500 text-white rounded">Save</button>
          </>
        ) : (
          <>
            <span onClick={handleToggle} className={`cursor-pointer ${todo.completed ? 'line-through text-green-500' : 'text-gray-700'}`}>{todo.todo}</span>
            <button onClick={handleEdit} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
          </>
        )}
      </div>
      <div>
        <button onClick={handleDelete} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;

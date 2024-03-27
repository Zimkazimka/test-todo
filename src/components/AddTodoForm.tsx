// components/AddTodoForm.tsx
import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {createTodo} from '../reducers/todos';
import {AppDispatch} from "../store";
import ProgressBar from "./ProgressBar";

const AddTodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      // @ts-ignore
      dispatch(createTodo({
        todo: text.trim(),
        completed: false,
        userId: 1
      }));
      setText('');
    }
  }, [dispatch, text]);

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Add new todo"
          className="p-2 border rounded"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
      <ProgressBar/></>
  );
};

export default AddTodoForm;

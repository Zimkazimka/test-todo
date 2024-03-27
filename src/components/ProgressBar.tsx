import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ProgressBar: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.items);
  const completedCount = todos.filter(todo => todo.completed).length;
  const remainingCount = todos.length - completedCount;
  const total = completedCount + remainingCount;
  const completedPercentage = (completedCount / total) * 100;

  return (
    <div className="mt-4">
      <div className="flex items-center">
        <div
          className="w-full h-8 bg-blue-500 rounded-full mr-2 transition-all"
          style={{ width: `${completedPercentage}%` }}
        ></div>
        <span>{completedPercentage.toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;

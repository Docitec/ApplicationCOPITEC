import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskAdded = () => {
    setRefreshKey(prev => prev + 1); // force la mise à jour de TaskList
  };

  return (
    <div>
      <h1>Application COPITEC</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList key={refreshKey} />
    </div>
  );
}

export default App;

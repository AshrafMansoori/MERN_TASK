import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Update Clear All to remove tasks from the database
  const handleClearAll = async () => {
    try {
      // Loop through and delete each task from the DB
      await Promise.all(todos.map(todo => 
        fetch(`http://localhost:5000/api/tasks/${todo._id}`, { method: 'DELETE' })
      ));
      setTodos([]); // Clear local state after successful DB deletion
    } catch (error) {
      console.error('Error clearing tasks:', error);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h2>Task_Manager</h2>
      </div>
      
      {/* Input Form */}
      <TaskForm todos={todos} setTodos={setTodos} />
      
      {/* Display List and Pop-up Modal */}
      <TaskList todos={todos} setTodos={setTodos} />
      
      <div className="footer">  
        <h3>You have {todos.length} pending tasks</h3>
        <button id="clear-button" onClick={handleClearAll}>Clear All</button>
      </div>
    </div>
  );
}

export default App;
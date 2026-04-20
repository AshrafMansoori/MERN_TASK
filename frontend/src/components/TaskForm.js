import { useState } from 'react';
import '../App.css';
import { PlusIcon } from './button'; // Make sure button.jsx is in the same folder

export default function TaskForm({ todos, setTodos }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    if (title.trim() !== '') {
      const newTask = {
        title: title,
        description: description
      };

      try {
        // Send POST request to backend
        const response = await fetch('http://localhost:5000/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          const savedTask = await response.json();
          // Add the task returned from the DB (which now has an _id) to local state
          setTodos([...todos, savedTask]);
          
          setTitle('');
          setDescription('');
        }
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }
  };

  return (
    <div className="input-container">
      <div className="input-add"> 
        <input 
          type="text" 
          placeholder="Add a new task title..." 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          placeholder="Add a description..." 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          rows={2}
        />
      </div>
     
      <button id="add-button" onClick={handleAddTask}>
          {PlusIcon()}
      </button>
    </div>
  );
}
import { useState } from 'react';
import '../App.css';

export default function TaskList({ todos, setTodos }) {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to backend using the unique _id
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the task from local state
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <>
      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-message">No tasks yet! Add a task to get started.</div>
        ) : (
          // Swapped 'index' for 'todo._id' for the key
          todos.map((todo) => (
            <div key={todo._id} className="todo-item">
              <div className="spacer">
                <span id="title">Title: </span>
                <span>{todo.title}</span>
              </div>
              
              <div className="action-buttons">
                <button 
                  className="view-button" 
                  onClick={() => setSelectedTask(todo)}
                >
                  View
                </button>
                {/* Passing todo._id to handleDelete instead of index */}
                <button 
                  className="delete-button" 
                  onClick={() => handleDelete(todo._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div> 

      {/* Pop-up Modal Window */}
      {selectedTask && (
        <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedTask.title}</h2>
            
            <div className="modal-description">
              <strong>Description:</strong>
              <p>{selectedTask.description ? selectedTask.description : "No description provided."}</p>
            </div>
            
            <button className="close-button" onClick={() => setSelectedTask(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
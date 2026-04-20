import { useState } from 'react';
import '../App.css';

export default function TaskList({ todos, setTodos }) {
  // State for the View modal
  const [selectedTask, setSelectedTask] = useState(null);
  
  // States for the Edit modal
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // 1. DELETE FUNCTION
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // 2. START EDITING (Opens modal and fills with current data)
  const startEditing = (todo) => {
    setEditingTask(todo);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  // 3. SAVE UPDATE FUNCTION (Sends PUT request to backend)
  const handleUpdate = async () => {
    if (editTitle.trim() === '') return; // Prevent saving an empty title

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${editingTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: editTitle, 
          description: editDescription 
        }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        
        // Update the specific task in our local React state
        setTodos(todos.map((todo) => 
          todo._id === editingTask._id ? updatedTask : todo
        ));
        
        // Close the modal
        setEditingTask(null);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <>
      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-message">No tasks yet! Add a task to get started.</div>
        ) : (
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
                {/* NEW EDIT BUTTON */}
                <button 
                  className="edit-button" 
                  onClick={() => startEditing(todo)}
                  style={{ backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer', marginLeft: '5px' }}
                >
                  Edit
                </button>
                <button 
                  className="delete-button" 
                  onClick={() => handleDelete(todo._id)}
                  style={{ marginLeft: '5px' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div> 

      {/* VIEW MODAL */}
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

      {/* NEW EDIT MODAL */}
      {editingTask && (
        <div className="modal-overlay" onClick={() => setEditingTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Task</h2>
            
            <div className="modal-description" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                type="text" 
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '90%' }}
              />
              <textarea 
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '90%', resize: 'vertical' }}
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
               <button 
                className="close-button" 
                onClick={() => setEditingTask(null)}
                style={{ backgroundColor: '#6c757d' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                style={{ backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 15px', cursor: 'pointer' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
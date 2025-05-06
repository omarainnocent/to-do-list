import { useState, useEffect } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { FaDeleteLeft } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDoneOutline } from "react-icons/md";

// Define types
interface Todo {
  _id?: number;
  title: string;
  completed?: boolean;
}

// API service
const API_BASE_URL = 'https://be-todo-app-xz0m.onrender.com/api/tasks';

const todoService = {
  getAllTasks: async () => {
    const response = await fetch(`${API_BASE_URL}/all`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.status}`);
    }
    return response.json();
  },
  
  addTask: async (title: string) => {
    const response = await fetch(`${API_BASE_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });
    if (!response.ok) {
      throw new Error(`Failed to add task: ${response.status}`);
    }
    return response.json();
  },
  
  deleteTask: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.status}`);
    }
    return response.json();
  }
};

// Main component
export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [status, setStatus] = useState<{
    loading: boolean;
    error: string | null;
    action: 'idle' | 'adding' | 'deleting' | 'updating';
  }>({
    loading: true,
    error: null,
    action: 'idle'
  });

  // Fetch all todos on component mount
  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      setStatus(prev => ({ ...prev, loading: true, error: null }));
      const data = await todoService.getAllTasks();
      setTodos(data.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setStatus(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to fetch tasks'
      }));
    } finally {
      setStatus(prev => ({ ...prev, loading: false }));
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTodo.trim()) return;
    
    try {
      setStatus(prev => ({ ...prev, action: 'adding', error: null }));
      await todoService.addTask(newTodo);
      setNewTodo('');
      await fetchAllTasks();
    } catch (error) {
      console.error('Error adding task:', error);
      setStatus(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to add task'
      }));
    } finally {
      setStatus(prev => ({ ...prev, action: 'idle' }));
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      setStatus(prev => ({ ...prev, action: 'deleting', error: null }));
      await todoService.deleteTask(id);
      await fetchAllTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      setStatus(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to delete task'
      }));
    } finally {
      setStatus(prev => ({ ...prev, action: 'idle' }));
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo._id || null);
    setEditText(todo.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-500 to-orange-700">
      <div className="w-full max-w-md bg-blue-950 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Todo List</h1>
        
        {/* Form for adding todos */}
        <form onSubmit={handleAddTodo} className="mb-6 flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border text-white font-medium bg-blue-900 border-blue-700 rounded-full 
                      placeholder-blue-300 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            disabled={status.action === 'adding'}
          />
          <button
            type="submit"
            disabled={status.action === 'adding' || !newTodo.trim()}
            className="px-4 py-2 text-white rounded-full bg-blue-600 hover:bg-blue-700 
                      transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status.action === 'adding' ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            ) : (
              <IoIosAddCircle className="text-2xl" />
            )}
          </button>
        </form>

        {/* Error message */}
        {status.error && (
          <div className="mb-4 p-3 bg-red-900 text-white rounded-lg">
            <p>{status.error}</p>
          </div>
        )}

        {/* Todo list */}
        {status.loading && todos.length === 0 ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-blue-800 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-blue-800 rounded"></div>
                  <div className="h-4 bg-blue-800 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ul className="space-y-3">
            {todos.length === 0 && !status.loading ? (
              <li className="text-center py-6 text-blue-300">No tasks yet. Add one above!</li>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo._id}
                  className="flex justify-between items-center p-3 border border-blue-800 rounded-full bg-blue-900 hover:bg-blue-800 transition-colors"
                >
                  {editingId === todo._id ? (
                    <input
                      type="text"
                      className="flex-1 px-3 py-1 mr-2 bg-blue-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={cancelEditing}
                      onKeyDown={handleKeyDown}
                      autoFocus
                    />
                  ) : (
                    <span className="flex-1 px-2 text-white truncate">{todo.title}</span>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(todo)}
                      className="p-2 text-blue-300 hover:text-blue-100 transition-colors"
                      aria-label="Edit task"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo._id!)}
                      disabled={status.action === 'deleting'}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                      aria-label="Delete task"
                    >
                      {status.action === 'deleting' ? (
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <FaDeleteLeft className="text-xl" />
                      )}
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
import { IoIosAddCircle } from "react-icons/io";
import { FaDeleteLeft} from "react-icons/fa6";
import { useState } from 'react';
import { FaEdit } from "react-icons/fa";
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [edit, setEditingText] = useState('')


  const EditHandler = (e) => {
    setEditingText(e.target.value)
    console.log(e.target.value)
  }

  const SubmitEdit = (id) => {
        setTodos([...todo]. map((todos) => {
          if(todos.id === id) {
            todos.text = edittext
          }
          return todos
        }))

        setEditingText(null)
        setEditingText("")
  }

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  


  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-600">
      <div className="w-full max-w-md md:h-scree bg-blue-950 p-8 rounded-xl shadow-black ">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Todo List</h1>

        <div className="mb-4 flex-row gap-6 mt-10">
        <input
            
            type="text"
            className="flex-2 px-4 mt-4 py-2 border border-gray-300 rounded-l-md"
            
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="add a note...... !"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 text-4xl text-white rounded-r-md hover:bg-gray-600"
          >
            <IoIosAddCircle className="font-extrabold h-6"/>
          </button>


        </div>

        <ul className="space-y-4 md:flex-col-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-4 border rounded-md ${
                todo.completed ? 'bg-green-100 line-through' : 'bg-gray-400'
              }`}
            >
              <span
                className="flex-1 cursor-pointer"
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                <FaDeleteLeft className="text-red-600 text-2xl"/>
              </button>
              {/* onClick={() => editTodos(todos.id)} */}
              <button
              className=""
              onClick={() => setEditingText(todos.id)}>
                <FaEdit className=" text-blue-900  text-2xl"/>
                
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

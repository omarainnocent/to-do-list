import { IoIosAddCircle } from "react-icons/io";
import { FaDeleteLeft} from "react-icons/fa6";
import {  useEffect, useState } from 'react';
interface Todo {
  _id: number;
  title: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');



  const addTodo = () => {
   
  };

 

  const deleteTodo = (_id: number) => {
   
  };

  

const fetchAllData = async () => {
  const response = await fetch('https://be-todo-app-xz0m.onrender.com/api/tasks/all');
  if(response.status !== 200) {
    throw new Error('can not fetch that data now');
  }

  const data = await response.json();
  setTodos(data.tasks)
  // console.log(data.tasks)
 
}

useEffect(() => {
  fetchAllData()
}, [])

console.log('todos', todos)

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
              key={todo._id}
              className={`flex justify-between items-center p-4 border rounded-md `}
            >
              <span
                className="flex-1 cursor-pointer text-white"
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                <FaDeleteLeft className="text-red-600 text-2xl"/>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

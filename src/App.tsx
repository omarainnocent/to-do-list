import { IoIosAddCircle } from "react-icons/io";
import { FaDeleteLeft } from "react-icons/fa6";
import { useEffect, useState } from 'react';
interface Todo {
  _id: number;
  title: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

//get req//
  const fetchAllData = async () => {
    const response = await fetch('https://be-todo-app-xz0m.onrender.com/api/tasks/all');
    if (response.status !== 200) {
      throw new Error('can not fetch the data now');
    }
    const data = await response.json();
    setTodos(data.tasks)
  };

  console.log(fetchAllData);

  //post req//
  const addTodo = async () => {
    const response = await fetch('https://be-todo-app-xz0m.onrender.com/api/tasks/add');
    if (response.status !== 200) {
      throw new Error('can not fetch the data');
    }
    const data = await response.json();
    setTodos(data.tasks)
  };
  console.log(addTodo);

//Delete//
const deleteTodo = async () => {
  const response = await fetch('https://be-todo-app-xz0m.onrender.com/api/tasks/:id');
  if (response.status !== 200) {
    throw new Error('can the fetch data')
  }
  const data = await response.json();
  setTodos(data.tasks)
};
console.log(deleteTodo);


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
            className="flex-2 px-4 mt-4 py-2 border text-white font-bold bg-blue-950 border-gray-300 rounded-full hover:bg-blue-900"

            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="add a note...... !"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 text-4xl text-white rounded-full hover:bg-blue-900"
          >
            <IoIosAddCircle className="font-extrabold h-6" />
          </button>


        </div>

        <ul className="space-y-4 md:flex-col-2">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className={`flex justify-between items-center p-4 border rounded-full `}
            >
              <span
                className="flex-1 cursor-pointer text-white"
              >
                {todo.title}
              </span>
              <button
                onClick={deleteTodo}
                className="ml-2 text-red-600 hover:text-red-900"
              >
                <FaDeleteLeft className="text-red-600 hover:text-red-900 text-3xl" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
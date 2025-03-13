import { IoIosAddCircle } from "react-icons/io";
import { FaDeleteLeft } from "react-icons/fa6";
import { useEffect, useState } from 'react';
interface Todo {
  _id?: number;
  title: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [adding, setAdding] = useState(false)

  useEffect(() => {

    fetchAllTasks()
  }, [])

  // console.log('todos', todos)
  const fetchAllTasks = async () => {
    // console.log('fetching all tasks')
    try {
      setLoading(true)
      const response = await fetch('https://be-todo-app-xz0m.onrender.com/api/tasks/all')

      // console.log(response)
      if (response.status === 200) {
        const data = await response.json()
        setTodos(data.tasks)
        // console.log(data.tasks)
      }
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }

  //deleting todo
  const deleteTodo = async (taskId: number) => {

    console.log('Deleting a task', taskId)
    try {
      setDeleting(true)
      const response = await fetch(`https://be-todo-app-xz0m.onrender.com/api/tasks/${taskId}`, {
        method: 'DELETE'
      })

      fetchAllTasks()
      // console.log(response)

      return response

    } catch (error) {
      console.error(error)
    }
    finally {
      setDeleting(false)
    }
  }


  //Adding todos//
  // const addTodo = async (taskId: number) => {
  //   console.log('adding a task', taskId)
  //   try {
  //     setAdding(true)
  //     const response = await fetch(`https://be-todo-app-xz0m.onrender.com/api/tasks`, {
  //       method: 'POST'
  //     })
  //     console.log(response)
  //     return response
  //   } catch (error) {
  //     console.error 
  //   }
  //   finally {
  //     setAdding(false)
  //   }
  // };



  const addTodo = async () => {
    console.log('Adding a task', newTodo);

    try {
      setAdding(true);
      const response = await fetch('https://be-todo-app-xz0m.onrender.com/api/tasks/add', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          title: newTodo
        })
      });

      console.log(response);
      fetchAllTasks()

      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
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
            {adding ? <p>processing</p> : (
              <IoIosAddCircle className="font-extrabold h-6" />
            )}
          </button>


        </div>
        {loading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          // <div className="flex flex-col items-start gap-5">
          //   {todos.map(task => {
          //     return(
          //       <div key={task._id} className="flex flex-row gap-5 items-center justify-between">
          //         <div>{task.title}</div>
          //         <div className="">
          //           <button 
          //           className="bg-red-500 rounded-lg p-2"
          //           onClick={() => handleDelete(task._id!)}
          //           >
          //             <FiDelete color="white" size={10} />
          //           </button>
          //         </div>
          //       </div>
          //     )
          //   })}
          // </div>
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
                  // onClick={deleteTodo(todo._id!)}
                  onClick={() => deleteTodo(todo._id!)}
                  className="ml-2 text-red-600 hover:text-red-900"
                >
                  {deleting ? (
                    <div>
                      <p className="text-white">processing</p>
                    </div>
                  ) : (
                    <FaDeleteLeft className="text-red-600 hover:text-red-900 text-3xl" />
                  )}

                </button>
              </li>
            ))}
          </ul>
        )}


      </div>
    </div>
  );
}
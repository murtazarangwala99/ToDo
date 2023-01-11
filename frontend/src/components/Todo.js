import React, { useState, useEffect } from "react";
import axios from "axios";

function Todo() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoTask, setTodoTask] = useState("");
  // console.log(todoTitle);
  // console.log(todoTask);

  const submitData = async () => {
    const todo = {
      title: todoTitle,
      //   tasks: todoTask,
    };
    const res = await axios.post("/createTodo", todo);
    console.log(res);
  };

  const [todoData, setTodoData] = useState("");
  const fetchTodoData = async () => {
    const res = await axios.get("/getTodos");

    // If no todos are there dont set value
    if (res.data.data.todosAll.length > 0) {
      // console.log(res.data);
      setTodoData(res.data.data.todosAll);
    }
    // console.log(res.data.data.todosAll.length);
    // console.log(res.data.data.todosAll);
  };

  // To load the data before page got refrece we use useEffect
  useEffect(() => {
    fetchTodoData();
  }, [todoData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // To submit the data
    submitData();
    // Empty the previous Details
    setTodoTitle("");
  };

  return (
    <>
      {/* Navbar  */}
      <nav className="container w-full m-auto">
        <ul className="container flex justify-between gap-1 flex-wrap">
          <li className="px-4 py-2 border-2 cursor-pointer hover:bg-green-300 hover:text-black rounded-lg">
            Home
          </li>
          <div className="flex gap-6">
            <li className="px-4 py-2 border-2 cursor-pointer hover:bg-green-300 hover:text-black rounded-lg">
              Developer
            </li>
            <li className="px-4 py-2 border-2 cursor-pointer hover:bg-red-700 hover:text-black rounded-lg">
              LogOut
            </li>
          </div>
        </ul>
      </nav>
      {/* Title of Web Page */}
      <div className="container flex justify-center items-center text-3xl lg:text-5xl text-white">
        ToDo Application
      </div>
      {/*  Title, Task and Submit Button */}
      <div className="container">
        <form
          action="#"
          method="post"
          className="container flex flex-col gap-4 justify-center items-center my-8"
          onClick={handleSubmit}
        >
          <div>
            <label
              className="text-slate-300 font-bold text-xl"
              htmlFor="todo-title"
            >
              Enter Title :
            </label>
            <input
              type="text"
              name="todo-title"
              id="todo-title"
              className="my-1 rounded-sm text-black focus:bg-green-300"
              value={todoTitle}
              onChange={(event) => setTodoTitle(event.target.value)}
            />
          </div>
          <div>
            <label
              className="text-slate-300 font-bold text-xl"
              htmlFor="todo-task"
            >
              Enter Tasks :
            </label>
            <input
              type="text"
              className="my-1 rounded-sm text-black focus:bg-green-300"
              id="todo-task"
              value={todoTask}
              onChange={(event) => setTodoTask(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-300 hover:text-black"
          >
            Submit
          </button>
        </form>
      </div>
      {/* Todo Heading  */}
      <div className="flex justify-center font-bold text-4xl m-4">
        <p>Your ToDo :</p>
        {/* Maybe Put One Refresh Button To load Todo */}
      </div>
      {/* All TODOS AND IT's Tasks */}
      {/* ********************* Testing 2 ****************************** */}

      <div className="container grid grid-col-4 m-auto bg-white text-black w-4/5 border">
        {/* TODO 1 */}
        {todoData &&
          todoData.map((todos) => (
            <details className="border-4 m-2 border-black">
              <summary className="py-3 px-4 font-bold cursor-pointer select-none w-full">
                {/* Looooooooooooopppppppppp */}
                <h2 className="inline">{todos.title}-----</h2>
                <a
                  className="bg-blue-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-blue-700 hover:text-white"
                  href="#"
                >
                  Add Tasks
                </a>
                <a
                  className="bg-yellow-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-yellow-700 hover:text-white"
                  href="#"
                >
                  Edit
                </a>
                <a
                  className="bg-red-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-red-700 hover:text-white"
                  href="#"
                >
                  Delete
                </a>
              </summary>
              {/* Tasks  */}

              <div className="pt-2 pb-3 px-4 mx-8 my-2 border-2 bg-slate-300 inline-block border-black font-semibold">
                {todos.tasks}
                <a
                  className="bg-yellow-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-yellow-700 hover:text-white"
                  href="#"
                >
                  Edit
                </a>
                <a
                  className="bg-red-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-red-700 hover:text-white"
                  href="#"
                >
                  Delete
                </a>
              </div>
            </details>
          ))}
      </div>

      {/* Testing using table - 3 */}
    </>
  );
}

export default Todo;

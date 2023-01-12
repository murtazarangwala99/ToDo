import React, { useState, useEffect } from "react";
import axios from "axios";

function Todo() {
  // All useState hooks should be at declaration level
  const [todoTitle, setTodoTitle] = useState("");
  // consider to capture tasks as array values instead of string
  const [todoTask, setTodoTask] = useState("");
  const [todoData, setTodoData] = useState("");

  const submitData = async () => {
    const todo = {
      title: todoTitle,
      //   tasks: todoTask, Why is this commented?
    };

    // await on this async call and then chain to show a toast message to user
    await axios.post("/createTodo", todo);
  };

  const fetchTodoData = async () => {
    const res = await axios.get("/getTodos");

    // If no todos are there dont set value
    if (res.data.data.todosAll.length > 0) {
      setTodoData(res.data.data.todosAll);
    }
  };

  // To load the data before page got refrece we use useEffect
  useEffect(() => {
    fetchTodoData();
  }, []);
  // mentioning todoData here will end you up in infinite API calls, the dependency array should be empty
  // 👉🏻 Watch this video: https://youtu.be/MXSuOR2yRvQ

  const handleSubmit = (event) => {
    event.preventDefault();

    // 💡 Where is the UI side validation to check for emptiness of the entered values?

    // To submit the data
    submitData();

    // Empty the previous Details, resetting state is expensive DOM operation before you update check for all others as well
    // I can see you didn't reset other values captured as task, data
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
            {/* 🌱 User action for click must always be a BUTTON but not an anchor or li tag */}
            <li className="px-4 py-2 border-2 cursor-pointer hover:bg-red-700 hover:text-black rounded-lg">
              LogOut
            </li>
          </div>
        </ul>
      </nav>
      {/* Title of Web Page */}
      {/* 💡 Explore how to load application name dynamically from .env of the REACT application. */}
      {/* Comes as a part of config driven UI, understand how Create react app is handling env values just 
      like Backend you have dotenv */}
      <div className="container flex justify-center items-center text-3xl lg:text-5xl text-white">
        ToDo Application
      </div>
      {/*  Title, Task and Submit Button */}
      <div className="container">
        <form
          action="#"
          method="post"
          className="container flex flex-col gap-4 justify-center items-center my-8"
          onSubmit={handleSubmit}
          // 🚩 onClick is a bundler to add here
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
        {/* TODOs List */}
        {todoData &&
          todoData.map((todos) => (
            // Every rendered list values via .map() in react must have a "key" prop associated with it
            // to bring out the best out of reconciliation algo built for react
            <div key={todos._id}>
              <details className="border-4 m-2 border-black">
                <summary className="py-3 px-4 font-bold cursor-pointer select-none w-full">
                  <h2 className="inline">{todos.title}-----</h2>
                  <button className="bg-blue-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-blue-700 hover:text-white">
                    Add Tasks
                  </button>
                  <button className="bg-yellow-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-yellow-700 hover:text-white">
                    Edit
                  </button>
                  <button className="bg-red-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-red-700 hover:text-white">
                    Delete
                  </button>
                </summary>
                {/* Tasks  */}

                <div className="pt-2 pb-3 px-4 mx-8 my-2 border-2 bg-slate-300 inline-block border-black font-semibold">
                  {todos.tasks &&
                    todos.tasks.map((task, index) => (
                      <div key={index} className="m-3">
                        {task}
                        <button className="bg-yellow-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-yellow-700 hover:text-white">
                          Edit
                        </button>
                        <button className="bg-red-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-red-700 hover:text-white">
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
              </details>
            </div>
          ))}
      </div>
    </>
  );
}

export default Todo;

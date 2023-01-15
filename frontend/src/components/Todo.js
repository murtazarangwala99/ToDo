import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "../UIComponent/Heading";

function Todo() {
  const [todoTitle, setTodoTitle] = useState("");
  // For Fetching Todo-Data
  const [todoData, setTodoData] = useState("");
  //  ----------  Submiting The Title Of Todo  ----------
  const submitTitle = async () => {
    const todo = {
      title: todoTitle,
    };
    await axios.post("/createTodo", todo);

    // if (typeof todo != "string") {
    //   alert("Enter Todo in String!");
    // } else {
    //   // await on this async call and then chain to show a toast message to user
    //   await axios.post("/createTodo", todo);
    // }
  };
  // ---------- Fetching All ToDos ----------
  const fetchTodoData = async () => {
    const res = await axios.get("/getTodos");
    // If no todos are there dont set value
    if (res.data.data.todosAll.length > 0) {
      setTodoData(res.data.data.todosAll);
    }
    // console.log(res.data.data.todosAll);
  };
  // ---------- Editing Todo Title ----------
  const editTitle = async (todoId) => {
    const newTitle = prompt("Enter New Title : ");
    if (!newTitle) {
      alert("Please Enter Title !");
    } else {
      const resEditTitle = await axios.put(`/changeTitle/${todoId._id}`, {
        changeTitle: newTitle,
      });
      console.log(resEditTitle);
    }
  };
  // ---------- Delete Title ----------
  const deleteTitle = async (todoId) => {
    if (window.confirm("Do you want to Delete This Todo !")) {
      const resDeleteTitle = await axios.delete(`/deleteTodo/${todoId._id}`);
      console.log(resDeleteTitle);
    } else {
      alert("You pressed Cancel !");
    }
  };
  //  ---------- Adding New Task On clicking addTask Button  ----------
  const addTodoTasks = async (todoId) => {
    const newTask = prompt("Enter Task : ");

    if (!newTask) {
      alert("Please Enter New Task !");
    } else {
      // Todo : Add Array Of Tasks
      // const addTask = newTask.split(",");
      const resTask = await axios.post(`/createTodoTask/${todoId._id}`, {
        addTask: newTask,
      });
      console.log(resTask);
    }
  };
  //  ---------- Pending : Delete Task ----------
  // const editTask = async () => {};
  //  ---------- Pending : Delete Task ----------
  const deleteTask = async (todoId, index) => {
    if (window.confirm("Do you want to Delete This Task !")) {
      const resDeleteTask = await axios.delete(`/deleteTask/${todoId}/${index}`);
      console.log(resDeleteTask);
    } else {
      alert("You pressed Cancel !");
    }
  };

  // To load the data before page got refrece we use useEffect
  useEffect(() => {
    fetchTodoData();
  }, []);
  // mentioning todoData here will end you up in infinite API calls, the dependency array should be empty
  // 👉🏻 Watch this video: https://youtu.be/MXSuOR2yRvQ

  //  ---------- Submiting Todo Title and preventing Default ----------
  const handleSubmit = (event) => {
    event.preventDefault();
    // 💡 Where is the UI side validation to check for emptiness of the entered values?

    // To submit the data
    submitTitle();
    // Empty the previous Details, resetting state is expensive DOM operation before you update check for all others as well
    // I can see you didn't reset other values captured as task, data
    setTodoTitle("");
  };

  return (
    <>
      {/* Navbar  */}
      {/* Title of Web Page */}
      {/* 💡 Explore how to load application name dynamically from .env of the REACT application. */}
      {/* Comes as a part of config driven UI, understand how Create react app is handling env values just 
      like Backend you have dotenv */}
      <Heading heading="ToDo Application" />
      {/*  Title, Task and Submit Button */}
      <div className="container">
        <form
          action="#"
          method="post"
          className="container flex flex-col gap-4 justify-center items-center my-8"
          onSubmit={handleSubmit}
          // 🚩 onClick is a blunder to add here
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
          {/* Removed Tasks Input */}
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
      {/* ********************* Testing 2 ******************************/}
      <div className="container grid grid-col-4 m-auto bg-white text-black w-3/5 border">
        {/* TODOs List */}
        {todoData &&
          todoData.map((todos) => (
            // Every rendered list values via .map() in react must have a "key" prop associated with it
            // to bring out the best out of reconciliation algo built for react
            <div key={todos._id}>
              <details className="border-4 m-2 border-black">
                {/* TODO Title */}
                <summary className="py-3 px-4 font-bold cursor-pointer select-none w-full">
                  <h2 className="inline-block w-1/4">{todos.title}</h2>
                  <button
                    className="bg-blue-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-blue-700 hover:text-white"
                    onClick={() => addTodoTasks(todos)}
                  >
                    Add Tasks
                  </button>
                  <button
                    className="bg-yellow-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-yellow-700 hover:text-white"
                    onClick={() => editTitle(todos)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-red-700 hover:text-white"
                    onClick={() => deleteTitle(todos)}
                  >
                    Delete
                  </button>
                </summary>
                {/* Tasks  */}
                <div className="container">
                  {todos.tasks &&
                    todos.tasks.map((task, index) => (
                      <div
                        key={index}
                        className="pt-2 pb-3 px-4 mx-8 my-2 border-2 bg-slate-300 flex border-black font-semibold"
                      >
                        Task {index + 1} : {task}
                        <div className="px-8">
                          <button className="bg-yellow-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-yellow-700 hover:text-white">
                            Edit
                          </button>
                          <button
                            className="bg-red-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-red-700 hover:text-white"
                            onClick={() => deleteTask(todos._id, index)}
                          >
                            Delete
                          </button>
                        </div>
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

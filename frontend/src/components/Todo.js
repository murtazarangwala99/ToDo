import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "../UIComponent/Heading";

function Todo() {
  const [todoTitle, setTodoTitle] = useState("");
  // For Fetching Todo-Data
  const [todoData, setTodoData] = useState("");
  //  ----------  Submiting The Title Of Todo  ----------
  const submitTitle = async () => {
    if (!todoTitle) {
      alert("Enter Title to Create Todo !");
    } else {
      await axios.post("/createTodo", {
        title: todoTitle,
      });
    }
  };
  // ---------- Fetching All ToDos ----------
  const fetchTodoData = async () => {
    const res = await axios.get("/getTodos");
    // If no todos are there dont set value
    if (res.data.data.todosAll.length > 0) {
      setTodoData(res.data.data.todosAll);
    }
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
  const addTask = async (todoId) => {
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
  // ---------- Edit task by Clicking Edit Button ----------
  const editTask = async (todoId, index) => {
    const newTask = prompt("Enter New Task : ");
    if (!newTask) {
      alert("Please Enter Task !");
    } else {
      const resEditTask = await axios.put(`/changeTask/${todoId}/${index}`, {
        changeTask: newTask,
      });
      console.log(resEditTask);
    }
  };
  //  ---------- Delete Task ----------
  const deleteTask = async (todoId, index) => {
    if (window.confirm("Do you want to Delete This Task !")) {
      const resDeleteTask = await axios.delete(
        `/deleteTask/${todoId}/${index}`
      );
      console.log(resDeleteTask);
    } else {
      alert("You pressed Cancel !");
    }
  };

  // To load the data before page got load
  useEffect(() => {
    fetchTodoData();
  }, [todoData]);
  //  ---------- Submiting Todo Title and preventing Default ----------
  const handleSubmit = (event) => {
    event.preventDefault();
    // To submit the data
    submitTitle();
    setTodoTitle("");
  };

  return (
    <>
      {/* Navbar  */}
      {/* Title of Web Page */}
      <Heading heading="ToDo Application" />
      {/*  Title, Task and Submit Button */}
      <div className="container">
        <form
          action="#"
          method="post"
          className="container flex flex-col gap-4 justify-center items-center my-8"
          onSubmit={handleSubmit}
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
      {/* All Todos with It's Tasks */}
      <div className="container grid grid-col-4 m-auto bg-white text-black w-3/5 border">
        {/* Todos List */}
        {todoData &&
          todoData.map((todos) => (
            <div key={todos._id}>
              <details className="border-4 m-2 border-black">
                {/* TODO Title */}
                <summary className="py-3 px-4 font-bold cursor-pointer select-none w-full">
                  <h2 className="inline-block w-1/4">{todos.title}</h2>
                  <button
                    className="bg-blue-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-blue-700 hover:text-white"
                    onClick={() => addTask(todos)}
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
                {/* Tasks */}
                <div className="container">
                  {todos.tasks &&
                    todos.tasks.map((task, index) => (
                      <div
                        key={index}
                        className="pt-2 pb-3 px-4 mx-8 my-2 border-2 bg-slate-300 flex border-black font-semibold"
                      >
                        Task {index + 1} : {task}
                        <div className="px-8">
                          <button
                            className="bg-yellow-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-yellow-700 hover:text-white"
                            onClick={() => editTask(todos._id, index)}
                          >
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

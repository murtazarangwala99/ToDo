const Todo = require("../models/todoSchema");

exports.home = (req, res) => {
  res.send("Homeee");
};
// Create Todo
exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(title);
    if (!title) {
      throw new Error("Please enter Todo Title !");
    }
    const created_todo = await Todo.create({ title });
    res.status(201).json({
      success: true,
      title,
      created_todo,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Todo - Task
exports.createTodoTask = async (req, res) => {
  try {
    const { addTask } = req.body;
    const todoAvailable = await Todo.findById(req.params.id);
    if (todoAvailable) {
      console.log("Todo Found");
    }
    todoAvailable.tasks.push(addTask);
    await todoAvailable.save();
    res.status(201).json({
      success: true,
      todoAvailable,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
// get Todo (title)
exports.getTodos = async (req, res) => {
  try {
    const todosAll = await Todo.find();
    res.status(201).json({
      success: true,
      results: todosAll.length,
      data: {
        todosAll,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: false,
      message: error.message,
    });
  }
};
// get Todo - Task #Pending
// exports.getTodoTasks = async (req, res) => {};
// Edit Todo
exports.editTodo = async (req, res) => {
  try {
    const { changeTitle } = req.body;
    console.log(changeTitle);
    const edit = await Todo.findByIdAndUpdate(req.params.id, {
      title: changeTitle,
    });

    res.status(201).json({
      success: true,
      edit,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
// Edit Todo - Task #TODO
exports.editTask = async (req, res) => {
  try {
    const { changeTask } = req.body;
    console.log(changeTask);
    const edit = await Todo.findById(req.params.id);

    // myarr.indexOf("turtles") > -1;
    // const found = edit.tasks.indexOf(changeTask) > -1;
    // if (found) {
    //   edit.tasks(changeTask);
    //   await edit.save();
    // }

    res.status(201).json({
      success: true,
      edit,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Todo
exports.deleteTodo = async (req, res) => {
  try {
    const delTodo = await Todo.findById(req.params.id);
    if (delTodo) {
      await Todo.deleteOne();
    }
    // const delTodo = await Todo.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      deleteTodo: delTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Todo - Task
exports.deleteTask = async (req, res) => {
  try {
    const userId = req.params.id;
    const task = await Todo.deleteOne(userId);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
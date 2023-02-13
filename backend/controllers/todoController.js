const Todo = require("../models/todoSchema");
// Home Route
exports.home = (req, res) => {
  res.send("Homeee");
};
// ---------- Create Todo(Title) ----------
exports.createTodo = async (req, res) => {
  try {
    const { title, userId } = req.body;
    console.log(title);
    console.log(userId);

    if (!title) {
      throw new Error("Please enter Todo Title !");
    }

    // const titleExists = await Todo.findOne({ title });
    // if (titleExists) {
    //   throw new Error("This TODO Title is Already Exists");
    // }

    const created_todo = await Todo.create({ title, userId });

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
// ---------- Create Task ----------
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
// ---------- Get All Todos ----------
exports.getTodos = async (req, res) => {
  try {
    const userId = req.params.userId;
    const todosAll = await Todo.find({ userId });
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
// ---------- Edit Todo (Title) ----------
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
// ---------- Edit Todo (Task) ----------
exports.editTask = async (req, res) => {
  try {
    const { changeTask } = req.body;
    // Finding Todo Id
    const edit = await Todo.findById(req.params.id);
    // Using splice to replace with new task
    const edited = edit.tasks.splice([req.params.index], 1, changeTask);
    await edit.save();
    res.status(201).json({
      success: true,
      editTask: edited,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
// ---------- Delete Todo (Title) ----------
exports.deleteTodo = async (req, res) => {
  try {
    const delTodo = await Todo.findById(req.params.id);
    if (delTodo) {
      await Todo.findByIdAndDelete(req.params.id);
    }
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
// ---------- Delete Task (Tasks) ----------
exports.deleteTask = async (req, res) => {
  try {
    const resp = await Todo.findById(req.params.id);
    const deletedTask = resp.tasks.splice([req.params.index], 1);
    await resp.save();
    res.status(201).json({
      success: true,
      deleteTask: deletedTask,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

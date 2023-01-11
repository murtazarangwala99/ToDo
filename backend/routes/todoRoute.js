const express = require("express");
const {
  home,
  createTodo,
  createTodoTask,
  getTodos,
  getTodoTasks,
  editTodo,
  editTask,
  deleteTodo,
  deleteTask,
} = require("../controllers/todoController");
const router = express.Router();

router.get("/", home);
// TODO : Have to add login and signup routes
// User Part Pending
router.post("/createTodo", createTodo);
router.get("/createTodoTask/:id", createTodoTask);
router.get("/getTodos", getTodos);
// router.get("/getTodoTasks/:id", getTodoTasks);
router.put("/changeTitle/:id", editTodo);
router.put("/changeTask/:id", editTask);
router.delete("/deleteTodo/:id", deleteTodo);
router.delete("/deleteTask/:id", deleteTask);

module.exports = router;

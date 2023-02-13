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
router.post("/createTodoTask/:id", createTodoTask);
router.get("/getTodos/:userId", getTodos);
router.put("/changeTitle/:id", editTodo);
router.put("/changeTask/:id/:index", editTask);
router.delete("/deleteTodo/:id", deleteTodo);
router.delete("/deleteTask/:id/:index", deleteTask);

module.exports = router;

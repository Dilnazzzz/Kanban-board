// Path: unittests.js

// test whether addToDo works correctly 

var todoList = new TodoList();
var todo = new Todo();
todoList.addToDo(todo);
assert(todoList.todos.length == 1, "addToDo should add a todo to the list");
assert(todoList.todos[0] == todo, "addToDo should add the correct todo to the list");

// test whether removeToDo works correctly
var todoList = new TodoList();
var todo = new Todo();
todoList.addToDo(todo);
todoList.removeToDo();
assert(todoList.todos.length == 0, "removeToDo should remove a todo from the list");

// renderToDo should either add or remove a todo from the list
// test whether renderToDo works correctly
var todoList = new TodoList();
var todo = new Todo();
todoList.addToDo(todo);
todoList.renderToDo();
assert(todoList.todos.length == 0, "renderToDo should remove a todo from the list");
renderTodo(todo);
assert(todoList.todos.length == 1, "renderToDo should add a todo to the list");
 


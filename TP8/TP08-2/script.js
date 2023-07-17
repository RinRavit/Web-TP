function createTodoItem(title, name, dateline) {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");

  const todoTitle = document.createElement("span");
  todoTitle.textContent = title;

  const todoName = document.createElement("span");
  todoName.textContent = name;

  const todoDateline = document.createElement("span");
  todoDateline.textContent = dateline;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => deleteTodoItem(todoContainer));
  todoContainer.appendChild(todoTitle);
  todoContainer.appendChild(todoName);
  todoContainer.appendChild(todoDateline);
  todoContainer.appendChild(deleteButton);

  return todoContainer;
}

// Function to add a new task item to the list
function addTodoItem(title, name, dateline) {
  const todoItem = createTodoItem(title, name, dateline);

  const todosContainer = document.getElementById("todos-container");
  todosContainer.appendChild(todoItem);
}

// Function to delete a todo item
function deleteTodoItem(todoItem) {
  const todosContainer = document.getElementById("todos-container");
  todosContainer.removeChild(todoItem);
}

// Function to save the todos to session storage
function saveTodosToSessionStorage() {
  const todosContainer = document.getElementById("todos-container");
  const todoItems = todosContainer.querySelectorAll(".todo-container");

  const todos = Array.from(todoItems).map((todoItem) => {
    const todoTitle = todoItem.querySelector("span:nth-child(1)").textContent;
    const todoName = todoItem.querySelector("span:nth-child(2)").textContent;
    const todoDateline =
      todoItem.querySelector("span:nth-child(3)").textContent;

    return {
      title: todoTitle,
      name: todoName,
      dateline: todoDateline,
    };
  });

  sessionStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load todos from session storage
function loadTodosFromSessionStorage() {
  const todos = JSON.parse(sessionStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    addTodoItem(todo.title, todo.name, todo.dateline);
  });
}

// Add event listener for the add task
const addTodoForm = document.getElementById("add-task");
addTodoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const todoTitleInput = document.getElementById("todo-title");
  const todoNameInput = document.getElementById("todo-name");
  const todoDatelineInput = document.getElementById("todo-dateline");

  const todoTitle = todoTitleInput.value.trim();
  const todoName = todoNameInput.value.trim();
  const todoDateline = todoDatelineInput.value;

  if (todoTitle !== "" && todoName !== "" && todoDateline !== "") {
    addTodoItem(todoTitle, todoName, todoDateline);
    saveTodosToSessionStorage();

    todoTitleInput.value = "";
    todoNameInput.value = "";
    todoDatelineInput.value = "";
  }
});

// Load task from session storage on page load
loadTodosFromSessionStorage();

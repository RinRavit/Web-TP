// Function to create a new todo item
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

// Function to add a new todo item to the list
function addTodoItem(title, name, dateline) {
  const todoItem = createTodoItem(title, name, dateline);
  // Add the todo item to the container
  const todosContainer = document.getElementById("todos-container");
  todosContainer.appendChild(todoItem);
}

// Function to delete a todo item
function deleteTodoItem(todoItem) {
  const todosContainer = document.getElementById("todos-container");
  todoItem.remove(todoItem);
  saveTodosToLocalStorage();
}

// Function to save the todos to local storage
function saveTodosToLocalStorage() {
  const todosContainer = document.getElementById("todos-container");
  const todoItems = todosContainer.querySelectorAll(".todo-container");

  const todos = Array.from(todoItems).map((todoItem) => {
    const todoContainer = todoItem.querySelector(".todo-container");
    const todoTitle = todoContainer.querySelector("span:nth-child(1)");
    const todoName = todoContainer.querySelector("span:nth-child(2)");
    const todoDateline = todoContainer.querySelector("span:nth-child(3)");

    return {
      title: todoTitle.textContent,
      name: todoName.textContent,
      dateline: todoDateline.textContent,
    };
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load todos from local storage
function loadTodosFromLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    addTodoItem(todo.title, todo.name, todo.dateline);
  });
}

// Add event listener for the add todo form
const addtask = document.getElementById("add-task");
addtask.addEventListener("submit", function (event) {
  event.preventDefault();

  const titleInput = document.getElementById("title-input");
  const nameInput = document.getElementById("name-input");
  const datelineInput = document.getElementById("dateline-input");

  const title = titleInput.value.trim();
  const name = nameInput.value.trim();
  const dateline = datelineInput.value;

  if (title !== "" && name !== "") {
    addTodoItem(title, name, dateline);
    saveTodosToLocalStorage();
    titleInput.value = "";
    nameInput.value = "";
    datelineInput.value = "";
  }
});

// Load todos from local storage on page load
loadTodosFromLocalStorage();

// Function to create a new todo item
function createTodoItem(title, name, dateline) {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");

  const titleSpan = document.createElement("span");
  titleSpan.textContent = title;

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Name: ";
  const nameSpan = document.createElement("span");
  nameSpan.textContent = name;

  const datelineLabel = document.createElement("label");
  datelineLabel.textContent = "Dateline: ";
  const datelineSpan = document.createElement("span");
  datelineSpan.textContent = dateline;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    todoContainer.remove();
    saveTodosToSessionStorage();
  });

  todoContainer.appendChild(titleSpan);
  todoContainer.appendChild(document.createElement("br"));
  todoContainer.appendChild(nameLabel);
  todoContainer.appendChild(nameSpan);
  todoContainer.appendChild(document.createElement("br"));
  todoContainer.appendChild(datelineLabel);
  todoContainer.appendChild(datelineSpan);
  todoContainer.appendChild(document.createElement("br"));
  todoContainer.appendChild(deleteButton);

  return todoContainer;
}

// Function to add a new todo item to the list
function addTodoItem(title, name, dateline) {
  const todoItem = createTodoItem(title, name, dateline);

  const todosContainer = document.getElementById("todos-container");
  todosContainer.appendChild(todoItem);

  saveTodosToSessionStorage();
}

// Function to save the todos to SessionStorage
function saveTodosToSessionStorage() {
  const todosContainer = document.getElementById("todos-container");
  const todoItems = todosContainer.getElementsByClassName("todo-container");

  const todos = Array.from(todoItems).map((todoItem) => {
    const titleSpan = todoItem.querySelector("span");
    const nameSpan = todoItem.querySelectorAll("span")[1];
    const datelineSpan = todoItem.querySelectorAll("span")[2];

    return {
      title: titleSpan.textContent,
      name: nameSpan.textContent,
      dateline: datelineSpan.textContent,
    };
  });

  sessionStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load todos from SessionStorage
function loadTodosFromSessionStorage() {
  const todos = JSON.parse(sessionStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    addTodoItem(todo.title, todo.name, todo.dateline);
  });
}

// Add event listener for the add todo form
const addTodoForm = document.getElementById("add-todo-form");
addTodoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const titleInput = document.getElementById("title-input");
  const nameInput = document.getElementById("name-input");
  const datelineInput = document.getElementById("dateline-input");

  const title = titleInput.value.trim();
  const name = nameInput.value.trim();
  const dateline = datelineInput.value;

  if (title !== "" && name !== "" && dateline !== "") {
    addTodoItem(title, name, dateline);

    titleInput.value = "";
    nameInput.value = "";
    datelineInput.value = "";
  }
});

// Load todos from SessionStorage on page load
loadTodosFromSessionStorage();

// const title = document.getElementById("#title");
// const name = document.getElementById("#Name");
// const dateline = document.getElementById("#dateline");
// const listTask = document.getElementById("#list-task");

// function addTask() {
//   if ((title.value === "", Name.value === "", dateline.value === "")) {
//     alert("You must write something!");
//   } else {
//     let li = document.createElement("li");
//     li.innerHTML = title.value;
//     li.innerHTML = Name.value;
//     li.innerHTML = dateline.value;
//     listTask.appendChild(li);
//   }
// }
// Retrieve todo list from localStorage if it exists
const todoList = JSON.parse(localStorage.getItem("todos")) || [];

// Function to add a new todo to the list
function addTodo() {
  const title = document.getElementById("title").value;
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;

  const todo = { title, name, date };
  todoList.push(todo);
  saveTodoList();

  displayTodos();
  clearInputs();
}

// Function to delete a todo from the list
function deleteTodo(index) {
  todoList.splice(index, 1);
  saveTodoList();

  displayTodos();
}

// Function to display the todos in the table
function displayTodos() {
  const table = document.getElementById("todoTable");

  // Clear the table body
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // Populate the table with todos
  for (let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];
    const row = table.insertRow();

    const titleCell = row.insertCell();
    const nameCell = row.insertCell();
    const dateCell = row.insertCell();
    const deleteCell = row.insertCell();

    titleCell.textContent = todo.title;
    nameCell.textContent = todo.name;
    dateCell.textContent = todo.date;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTodo(i);
    deleteCell.appendChild(deleteButton);
  }
}

// Function to clear the input fields
function clearInputs() {
  document.getElementById("title").value = "";
  document.getElementById("name").value = "";
  document.getElementById("date").value = "";
}

// Function to save the todo list in localStorage
function saveTodoList() {
  localStorage.setItem("todos", JSON.stringify(todoList));
}

// Display the initial todos on page load
displayTodos();

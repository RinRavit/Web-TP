// Function to create a new cookie item
function createCookieItem(key, value, expired) {
  const cookieItem = document.createElement("div");
  cookieItem.classList.add("cookie-item");

  const keySpan = document.createElement("span");
  keySpan.textContent = `${key}`;

  const valueSpan = document.createElement("span");
  valueSpan.textContent = `${value}`;

  const expiredDate = new Date(expired);
  const today = new Date();

  const expireButton = document.createElement("button");
  expireButton.textContent = "Expire";
  expireButton.style.display = expiredDate <= today ? "block" : "none";
  expireButton.addEventListener("click", () => {
    // Handle expiration logic (in real scenario, you'd update the cookie expiration)
    alert("This cookie has expired!");
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.display = expiredDate <= today ? "none" : "block";
  deleteButton.addEventListener("click", () => {
    // Handle delete logic (in real scenario, you'd delete the cookie)
    alert("This cookie has been deleted!");
  });

  cookieItem.appendChild(keySpan);
  cookieItem.appendChild(valueSpan);
  cookieItem.appendChild(expireButton);
  cookieItem.appendChild(deleteButton);

  return cookieItem;
}

// Function to add a new cookie item to the list
function addCookieItem(key, value, expired) {
  const cookieItem = createCookieItem(key, value, expired);

  const cookieList = document.getElementById("cookie-list");
  cookieList.appendChild(cookieItem);
}

// Add event listener for the add cookie form
const addCookie = document.getElementById("add-cookie");
addCookie.addEventListener("submit", function (event) {
  event.preventDefault();

  const keyInput = document.getElementById("key");
  const valueInput = document.getElementById("value");
  const expiredInput = document.getElementById("expired");

  const key = keyInput.value.trim();
  const value = valueInput.value.trim();
  const expired = expiredInput.value.trim();

  if (key !== "" && value !== "" && expired !== "") {
    addCookieItem(key, value, expired);
    keyInput.value = "";
    valueInput.value = "";
    expiredInput.value = "";
  }
});

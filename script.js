function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

const groceryInput = document.getElementById("grocery-input");
const groceryList = document.getElementById("grocery-list");

// Initialize groceries array to store the groceries
let groceries = [];

// Load groceries from local storage when the page loads
function loadgroceries() {
  const savedgroceries = JSON.parse(localStorage.getItem("groceries"));
  if (savedgroceries) {
    groceries = savedgroceries;
    displaygroceries();
  }
}

// Save groceries to local storage
function savegroceries() {
  localStorage.setItem("groceries", JSON.stringify(groceries));
}

function addGrocery() {
  const groceryText = groceryInput.value;

  if (groceryText) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.classList.add("hidden");
    // Create a new grocery object
    const grocery = {
      uuid: create_UUID,
      item: groceryText,
      date: new Date(),
    };

    // Add the grocery to the groceries array
    groceries.push(grocery);

    // Save groceries to local storage
    savegroceries();

    // Add the grocery to the grocery list
    displaygroceries();

    // Clear the input field
    groceryInput.value = "";
  } else {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.classList.remove("hidden");
    errorMessage.classList.add("text-red-500");
    errorMessage.innerHTML = "Please Enter a Grocery Item";
  }
}

function deletegrocery(index) {
  // Remove the grocery from the groceries array
  groceries.splice(index, 1);

  // Save groceries to local storage
  savegroceries();

  // Update the grocery list to reflect the change
  displaygroceries();
}

function displaygroceries() {
  groceryList.innerHTML = "";

  groceries.forEach((grocery) => {
    const groceryItem = document.createElement("li");
    groceryItem.className =
      "list-item flex items-center justify-between border-b border-gray-300 py-2";
    groceryItem.innerHTML = `
                <div class="flex items-center justify-between">
                    <span class="grocery-text">${grocery.item}</span>
                </div>
                <div class="flex items-center justify-end">
                    <button onclick="editgrocery(${grocery.uuid})" class="text-blue-500 mr-2">Edit</button>
                    <button onclick="deletegrocery(${grocery.uuid})" class="text-red-500">Delete</button>
                </div>
            `;
    groceryList.appendChild(groceryItem);
  });
}

// Edit grocery
function editgrocery(index) {
  console.log(index);
  let grocery = groceries.filter((item) => item.uuid === index);
  console.log(grocery);
  const updatedText = prompt("Edit the grocery:");
  if (updatedText) {
    grocery.item = updatedText;
    savegroceries();
    displaygroceries();
  }
}
// Load groceries when the page loads
loadgroceries();

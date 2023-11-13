//Unique ID generator

function generateId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

//get Groceries from storage
const groceriesDb = JSON.parse(localStorage.getItem("groceriesDb"))
  ? JSON.parse(localStorage.getItem("groceriesDb"))
  : [];

const groceriesContainer = document.getElementById("groceries-container");

const addGroceryForm = document.getElementById("groceryForm");

let groceryItemtoEditID;

//call paint dom function

paintDom();

//add grocery to storage

addGroceryForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const groceryItem = document.querySelector("#groceryForm input").value;
  if (!groceryItem) {
    return;
  } else {
    groceriesContainer.innerHTML = "";

    const groceryData = {
      item: groceryItem,
      time: new Date().getTime(),
      id: generateId(),
    };

    groceriesDb.push(groceryData);

    addGroceryToStorage();
    paintDom();
    addGroceryForm.reset();
  }
});

//Add grocery to storage
function addGroceryToStorage() {
  localStorage.setItem("groceriesDb", JSON.stringify(groceriesDb));
}

//hide empty container

if (groceriesDb.length !== 0) {
  document.getElementById("empty-groceries-container").classList.add("hidden");
}

// Function to PaintDOM with Groceries

function paintDom() {
  if (groceriesDb.length == 0) {
    return;
  } else {
    groceriesDb.sort((a, b) => b.time - a.time);
    groceriesDb.forEach((groceryItem) => {
      groceriesContainer.innerHTML += `

    <div
            class="group flex justify-between py-3 px-2 bg-slate-50 hover:bg-slate-200 rounded-lg"
          >
            <h3>${groceryItem.item}</h3>
            <section class="gap-2 hidden group-hover:flex">
              <button onclick="editGrocery('${groceryItem.id}')">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
              <img src="images/delete-icon.png" class="w-6 h-6" onclick="deleteGrocery('${groceryItem.id}')"/>
            
            </section>
          </div>
    `;
    });
  }
}

//End of Function to PaintDOM with Groceries

//function to delete gocery item

function deleteGrocery(id) {
  const newGroceriesDb = groceriesDb.filter((item) => item.id !== id);
  groceriesDb.length = 0;
  groceriesDb.push(...newGroceriesDb);
  addGroceryToStorage();
  groceriesContainer.innerHTML = "";
  paintDom();
}

//End of function to delete gocery item

//function to edit grocery item

function editGrocery(id) {
  const editForm = document.querySelector("#update-item");
  editForm.classList.add("transition-all");
  editForm.classList.replace("scale-0", "scale-[100%]");

  const groceryToEdit = groceriesDb.filter((item) => item.id == id)[0];

  const inputField = document.querySelector("#update-item input");
  inputField.value = groceryToEdit.item;
  inputField.focus();
  groceryItemtoEditID = id;
}

///////////End of function to edit grocery item

//function to save the edited grocery item

function saveEdit() {
  const filteredItem = groceriesDb.filter(
    (item) => item.id == groceryItemtoEditID
  );
  itemToEdit = filteredItem[0];

  const newGroceriesDb = groceriesDb.filter(
    (item) => item.id !== groceryItemtoEditID
  );

  const editInputField = document.querySelector("#update-item input");

  itemToEdit.item = editInputField.value;
  itemToEdit.time = new Date().getTime();

  newGroceriesDb.push(itemToEdit);
  groceriesDb.length = 0;
  groceriesDb.push(...newGroceriesDb);

  localStorage.setItem("groceriesDb", JSON.stringify(groceriesDb));

  const editForm = document.querySelector("#update-item");
  editForm.classList.replace("scale-[100%]", "scale-0");

  groceriesContainer.innerHTML = "";

  paintDom();
}

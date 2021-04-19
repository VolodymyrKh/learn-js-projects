// select list items

const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");

const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit options for editItem fn
let editElement;
let editFlag = false;
let editID = "";

// EVENT LISTENERS

// submit form
form.addEventListener("submit", addItem);

// clear items
clearBtn.addEventListener("click", clearItems);

// load items from LS
window.addEventListener("DOMContentLoaded", setupItems);

// FUNCTIONS

function addItem(e) {
  e.preventDefault();
  value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    createListItem (id, value)
    displayAlert("item added to our list", "success");
    // show list container
    container.classList.add("show-container");
    // add to local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value have been changed", "success");
    // edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
    // console.log("edit item");
  } else {
    displayAlert("Please enter value", "danger");
  }
}

// alert function
function displayAlert(text, action) {
  alert.classList.add(`alert-${action}`);
  alert.textContent = text;

  // remove alert message
  setTimeout(() => {
    alert.classList.remove(`alert-${action}`);
    alert.textContent = "";
  }, 1500);
}

// clear all items from the list
function clearItems() {
  // const items = document.querySelectorAll(".grocery-item");
  // if (items.length > 0) {
  //   items.forEach((item) => {
  //     list.removeChild(item);
  //   });
  // }
  list.innerHTML = "";
  container.classList.remove("show-container");
  displayAlert("list is empty", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}

//delete item
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  list.removeChild(element);

  // console.log(list.children);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }

  displayAlert("item removed from the list", "danger");
  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(element.dataset.id);
}

//edit item
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}

// set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// local storage
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter((item) => item.id !== id);
  console.log(items);
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map((item) => (item.id === id ? { id, value } : item));
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(({id, value}) => {
      createListItem(id, value)
    });
    container.classList.add('show-container')
  }
}

function createListItem(id, value) {
  const element = document.createElement("articte");
  // add class
  element.classList.add("grocery-item");
  // add id
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `<p class="title">${value}</p>
                        <div class="btn-container">
                         <button class="edit-btn" type="button">
                            <i class="fas fa-edit"></i>
                         </button>
                         <button class="delete-btn">
                            <i class="fas fa-trash"></i>
                         </button>
                       </div>`;

  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);

  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  list.appendChild(element);
}

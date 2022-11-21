"use strict";

//Set app title
let appTitle = "Todo App";

document.querySelector(".app-title").innerText = appTitle;

const toListItem = document.querySelector(".list-group");
const todoInput = document.getElementById("toDoInput");
const todoButton = document.getElementById("toDoBtn");
const toDoForm = document.forms.todoForm;

function newElement(elementName, className = 0) {
  const elem = document.createElement(elementName);
  if (className) {
    elem.className = className;
  }
  return elem;
}

function appendItem(value) {
  const newItem = newElement("li", "list-group-item");
  toListItem.appendChild(newItem);

  const newItemName = newElement("label", "form-check-label");
  newItem.appendChild(newItemName);
  newItemName.append(value);

  const btnGroup = newElement("div", "btn-group");
  //const btnEdit = newElement("span", "btn-edit");
  const btnDelete = newElement("span", "btn-delete");

  newItem.appendChild(btnGroup);

  //btnGroup.appendChild(btnEdit).innerHTML = '<i class="bi bi-pencil"></i>';
  btnGroup.appendChild(btnDelete).innerHTML = '<i class="bi bi-trash"></i>';
}




 // Parse the serialized data back into an array of objects
  let ddd = JSON.parse(localStorage.getItem("myItems")) || [];

  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem("myItems", JSON.stringify(ddd));






function saveDataOnLocalStorage(data) {
  // Parse the serialized data back into an array of objects
  todoItems = JSON.parse(localStorage.getItem("toDoData")) || [];
  // Push the new data (whether it be an object or anything else) onto the array
  todoItems.push(data);
  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem("toDoData", JSON.stringify(todoItems));
}

let todoItems = "";

//Get items from local storage
todoItems = JSON.parse(localStorage.getItem("toDoData"));

toDoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(toDoForm);

  // const formDataURI = new URLSearchParams(formData).toString();
  const formObject = Object.fromEntries(formData);
  const formJSON = JSON.stringify(formObject);

  /*   const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://reqres.in/api/users/2", true);
  xhr.onload = function () {
    let result = JSON.parse(xhr.responseText);
    console.log(result.data);
  };
  xhr.send(); */

  fetch("https://reqres.in/api/users/2", {
    method: "GET",
  })
    .then((response) => response.json()) // get the json data from response object.
    .then((result) => console.table(result.data)); // display data in console

  let value = todoInput.value;
  if (value) {
    appendItem(value);
    saveDataOnLocalStorage(value);
    todoInput.value = null;
  }
});

if (todoItems) {
  todoItems.forEach((item) => appendItem(item));
}

toListItem.addEventListener("click", function (event) {
  const deleteBtn = event.target.parentNode;
  if (deleteBtn && deleteBtn.classList.contains("btn-delete")) {
    removeItem(event);
  }
});

function removeItem(event) {
  //let parent = event.target.parentNode.parentNode.parentNode;
  let parent = event.target.closest(".list-group-item");
  let currentData = parent.firstChild.innerText;
  let index = todoItems.indexOf(currentData);

  parent.remove();
  todoItems.splice(index, 1);
  localStorage.setItem("toDoData", JSON.stringify(todoItems));
}
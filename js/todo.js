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

const lsKey = "myItems";
let todoItems = JSON.parse(localStorage.getItem(lsKey)) || [];

// Parse the serialized data back into an array of objects
localStorage.setItem(lsKey, JSON.stringify(todoItems));

function storeItem(data) {
  let newList = {
    id: todoItems.length,
    item: data,
    done: false,
  };
  todoItems.push(newList);

  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem(lsKey, JSON.stringify(todoItems));
}

toDoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let value = todoInput.value;
  if (value) {
    storeItem(value);
    displayList(true);
    appendItem(value);
    todoInput.value = null;
  }
});

if (todoItems) {
  todoItems.forEach((list) => appendItem(list.item));
}

function displayList(state) {
  let listWrap = document.querySelector(".list-items");
  listWrap.hidden = !state;
}
displayList(todoItems.length > 0);

toListItem.addEventListener("click", function (event) {
  const deleteBtn = event.target.parentNode;
  if (deleteBtn && deleteBtn.classList.contains("btn-delete")) {
    removeItem(event);
    displayList(todoItems.length > 0);
  }
});

function removeItem(event) {
  let parent = event.target.closest(".list-group-item");
  let currentData = parent.firstChild.innerText;
  let index = todoItems.indexOf(currentData);

  parent.remove();
  todoItems.splice(index, 1);
  localStorage.setItem(lsKey, JSON.stringify(todoItems));
}

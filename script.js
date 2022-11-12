let todoItems = [];
let doingItems = [];
let doneItems = [];

const form = document.querySelector(".js-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector(".js-todo-input");

  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});

function renderTodo(todo) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
  const list = document.querySelector(".js-todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);
  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) list.innerHTML = "";
    return;
  }

  const isChecked = todo.checked ? "done" : "";
  const node = document.createElement("li");
  node.setAttribute("class", `todo-item ${isChecked}`);
  node.setAttribute("data-key", todo.id);
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;
  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };
  todoItems.push(todo);
  renderTodo(todo);
}

function deleteTodo(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index],
  };
  todoItems = todoItems.filter((item) => item.id !== Number(key));
  renderTodo(todo);
}

const list = document.querySelector(".js-todo-list");

list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
    deleteTodo(itemKey);
  }
  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

function toggleDone(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);

  addDoing(todoItems[index].text);
}

function renderDoing(doing) {
  localStorage.setItem("doingItems", JSON.stringify(doingItems));
  const list = document.querySelector(".js-doing-list");

  const item = document.querySelector(`[data-key='${doing.id}']`);

  if (doing.deleted) {
    item.remove();
    if (doingItems.length === 0) list.innerHTML = "";
    return;
  }
  const isChecked = doing.checked ? "done" : "";
  const node = document.createElement("li");
  node.setAttribute("class", `todo-item ${isChecked}`);
  node.setAttribute("data-key", doing.id);
  node.innerHTML = `
    <input id="${doing.id}" type="checkbox"/>
    <label for="${doing.id}" class="tick js-tick"></label>
    <span>${doing.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;
  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function addDoing(text) {
  const doing = {
    text,
    checked: false,
    id: Date.now(),
  };

  doingItems.push(doing);

  renderDoing(doing);
}

function deleteDoing(key) {
  const index = doingItems.findIndex((item) => item.id === Number(key));
  const doing = {
    deleted: true,
    ...doingItems[index],
  };
  doingItems = doingItems.filter((item) => item.id !== Number(key));
  renderDoing(doing);
}

const list2 = document.querySelector(".js-doing-list");

list2.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDoing(itemKey);
    deleteDoing(itemKey);
  }
  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteDoing(itemKey);
  }
});

function toggleDoing(key) {
  const index = doingItems.findIndex((item) => item.id === Number(key));
  doingItems[index].checked = !doingItems[index].checked;
  renderDoing(doingItems[index]);

  addDone(doingItems[index].text);
}

function renderDone(done) {
  localStorage.setItem("doneItems", JSON.stringify(doneItems));

  const list = document.querySelector(".js-done-list");

  const item = document.querySelector(`[data-key='${done.id}']`);

  if (done.deleted) {
    item.remove();
    if (doneItems.length === 0) list.innerHTML = "";
    return;
  }
  const isChecked = done.checked ? "done" : "";
  const node = document.createElement("li");
  node.setAttribute("class", `todo-item ${isChecked}`);
  node.setAttribute("data-key", done.id);
  node.innerHTML = `
    <input id="${done.id}" type="checkbox"/>
    <label for="${done.id}" class="tick js-tick"></label>
    <span>${done.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;
  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function addDone(text) {
  const done = {
    text,
    checked: false,
    id: Date.now(),
  };

  doneItems.push(done);

  renderDone(done);
}

function deleteDone(key) {
  const index = doneItems.findIndex((item) => item.id === Number(key));
  const done = {
    deleted: true,
    ...doneItems[index],
  };
  doneItems = doneItems.filter((item) => item.id !== Number(key));
  renderDone(done);
}

const list3 = document.querySelector(".js-done-list");

list3.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleRemove(itemKey);
    deleteDone(itemKey);
  }
  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteDone(itemKey);
  }
});

function toggleRemove(key) {
  const index = doneItems.findIndex((item) => item.id === Number(key));
  doneItems[index].checked = !doneItems[index].checked;
  renderDone(doneItems[index]);
}

document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("todoItems");
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach((t) => {
      renderTodo(t);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const ref2 = localStorage.getItem("doingItems");
  if (ref2) {
    doingItems = JSON.parse(ref2);
    doingItems.forEach((t) => {
      renderDoing(t);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const ref3 = localStorage.getItem("doneItems");
  if (ref3) {
    doneItems = JSON.parse(ref3);
    doneItems.forEach((t) => {
      renderDone(t);
    });
  }
});

const addForm = document.querySelector("#add");
const list = document.querySelector("#todos");
const search = document.querySelector("#search input");
let todos;

const generateTemplate = (todo) => {
  const html = `
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="bi bi-trash-fill"></i>
  </li>
    `;

  list.innerHTML += html;
};

if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));

  todos.forEach((todo) => {
    generateTemplate(todo);
  });
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();

  if (!todos || localStorage.getItem("todos") === "[]") {
    todos = [];
    list.innerHTML = ``;
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-trash-fill")) {
    e.target.parentElement.remove();

    todos = todos.filter(
      (todo) => todo !== e.target.parentElement.children[0].textContent
    );
    localStorage.setItem("todos", JSON.stringify(todos));

    if (!list.children.length) {
      list.innerHTML = `
      <div class="text-center text-light">
        <span>No current to-do item</span>
      </div>
      `;
    }
  }
});

const filterTodos = (query) => {
  const lists = Array.from(list.children);
  const noMatch = document.querySelector("#noMatch");

  lists
    .filter((todo) => !todo.textContent.toLowerCase().includes(query))
    .forEach((todo) => todo.classList.add("d-none"));

  lists
    .filter((todo) => todo.textContent.toLowerCase().includes(query))
    .forEach((todo) => todo.classList.remove("d-none"));

  if (lists.every((todo) => todo.classList.contains("d-none"))) {
    noMatch.classList.remove("d-none");
    noMatch.classList.add("d-block");
  } else {
    noMatch.classList.add("d-none");
    noMatch.classList.remove("d-block");
  }
};

search.addEventListener("keyup", (e) => {
  const query = search.value.trim().toLowerCase();
  filterTodos(query);
});

if (!list.children.length) {
  list.innerHTML = `
  <div class="text-center text-light">
    <span>No current to-do item</span>
  </div>
  `;
}

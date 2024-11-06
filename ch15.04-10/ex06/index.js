const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
.todo-item button {
  margin-left: 0.4em; /* 削除ボタンの前スペース */
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    this.todoInput = this.shadowRoot.querySelector("#new-todo");
    this.todoList = this.shadowRoot.querySelector("#todo-list");

    this.form.addEventListener("submit", this.addTodo.bind(this)); // this.addTodo.bind(this)
  }

  addTodo(ev) {
    ev.preventDefault();
    const todoText = this.todoInput.value.trim();
    if (todoText) {
      const li = document.createElement("li");
      li.classList.add("todo-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", this.toggleComplete.bind(this));

      const span = document.createElement("span");
      span.textContent = todoText;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", this.deleteTodo.bind(this));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteButton);
      this.todoList.appendChild(li);

      this.todoInput.value = "";
    }
  }

  toggleComplete(ev) {
    const checkbox = ev.target;
    const li = checkbox.parentElement;
    li.querySelector("span").classList.toggle("completed", checkbox.checked);
  }

  deleteTodo(ev) {
    const deleteButton = ev.target;
    const li = deleteButton.parentElement;
    this.todoList.removeChild(li);
  }
}

customElements.define("todo-app", TodoApp);

const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
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
      li.textContent = todoText;
      li.addEventListener("click", this.toggleComplete.bind(this));
      this.todoList.appendChild(li);
      this.todoInput.value = "";
    }
  }

  toggleComplete(ev) {
    const li = ev.target;
    li.classList.toggle("completed");
  }
}

customElements.define("todo-app", TodoApp);

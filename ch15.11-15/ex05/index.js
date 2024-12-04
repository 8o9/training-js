document.addEventListener("DOMContentLoaded", () => {
  // 共通して使う、indexedDBへの接続
  let db;
  // https://developer.mozilla.org/ja/docs/Web/API/Window/indexedDB
  const request = window.indexedDB.open("todoDB");

  // 初期化のために必要
  // https://developer.mozilla.org/ja/docs/Web/API/IDBOpenDBRequest/upgradeneeded_event
  request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("todo", "todo", { unique: false });
    objectStore.createIndex("status", "status", { unique: false });
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    loadTodos();
  };

  request.onerror = (event) => {
    console.error("Database error: " + event.target.errorCode);
  };

  const form = document.querySelector("#new-todo-form");
  const list = document.querySelector("#todo-list");
  const input = document.querySelector("#new-todo");

  form.addEventListener("submit", (e) => {
    // form のイベントのキャンセルを実施
    e.preventDefault();

    if (input.value.trim() === "") {
      return;
    }
    const todoText = input.value.trim();
    input.value = "";

    addTodoToDB(todoText, "active");
  });

  function addTodoToDB(todoText, status) {
    const transaction = db.transaction(["todos"], "readwrite");
    const objectStore = transaction.objectStore("todos");
    const request = objectStore.add({ todo: todoText, status: status });

    request.onsuccess = (event) => {
      const todoId = event.target.result;
      console.log(`${todoText} was added to the database with ID: ${todoId}`);
      showTodo(todoId, todoText, status);
    };

    request.onerror = (event) => {
      console.log(`ERR adding ${todoText}: ${event.target.errorCode}, ${db}`);
    };
  }

  function loadTodos() {
    const transaction = db.transaction(["todos"], "readonly");
    const objectStore = transaction.objectStore("todos");
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      const todos = event.target.result;
      todos.forEach((todo) => {
        showTodo(todo.id, todo.todo, todo.status);
      });
    };

    request.onerror = (event) => {
      console.error(`ERR loading todos: ${event.target.errorCode}`);
    };
  }

  function showTodo(todoId, todoText, status) {
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = todoText;
    label.style.textDecorationLine = status === "completed" ? "line-through" : "none";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = status === "completed";
    toggle.onchange = () => {
      const v = label.style.textDecorationLine;
      label.style.textDecorationLine = v === "none" ? "line-through" : "none";
      updateTodoInDB(todoId, toggle.checked ? "completed" : "active");
    };

    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.onclick = () => {
      elem.remove();
      deleteTodoFromDB(todoId);
    };

    const d = document.createElement("div");
    d.appendChild(toggle);
    d.appendChild(label);
    d.appendChild(destroy);
    elem.appendChild(d);
    list.prepend(elem);
  }

  function updateTodoInDB(id, status) {
    const transaction = db.transaction(["todos"], "readwrite");
    const objectStore = transaction.objectStore("todos");
    const request = objectStore.get(id);

    request.onsuccess = (event) => {
      const todo = event.target.result;
      todo.status = status;
      const updateRequest = objectStore.put(todo);

      updateRequest.onsuccess = () => {
        console.log(`Todo updated in the database ${todo}`);
      };

      updateRequest.onerror = (event) => {
        console.log(`ERR updating todo: ${event.target.errorCode}`);
      };
    };

    request.onerror = (event) => {
      console.error(`ERR get id when updateToDo todo: ${event.target.errorCode}`);
    };
  }
  
  function deleteTodoFromDB(id) {
    const transaction = db.transaction(["todos"], "readwrite");
    const objectStore = transaction.objectStore("todos");
    const request = objectStore.delete(id);

    request.onsuccess = () => {
      console.log(`Todo[${id}] was deleted from the database`);
    };

    request.onerror = (event) => {
      console.error(`ERR deleting todo[${id}]: ${event.target.errorCode}`);
    };
  }
});
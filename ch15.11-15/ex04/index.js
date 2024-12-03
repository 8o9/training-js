document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#new-todo-form");
  const list = document.querySelector("#todo-list");
  const input = document.querySelector("#new-todo");

  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  form.addEventListener("submit", (e) => {
    // form のイベントのキャンセルを実施
    // 最初にデフォルト動作のキャンセルを明確にし、途中エラーがあって抜けるなどしてキャンセル処理が飛ばされたりしないようにする
    // なおイベントリスナーの処理が終わるまでデフォルトの動作(ページのリロード)は保留される?
    e.preventDefault();

    // 両端からホワイトスペースを取り除いた文字列を取得する
    if (input.value.trim() === "") {
      return;
    }
    const todoName = input.value.trim();
    // new-todo の中身は空にする
    input.value = "";
    const todoId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    addTodo2List(todoId, todoName, "active");
  });

  const addTodo2List = (id, name, status) => {
    // ここから #todo-list に追加する要素を構築する
    const elem = document.createElement("li");
    elem.dataset.id = id;

    const label = document.createElement("label");
    label.textContent = name;
    label.style.textDecorationLine = status === "completed" ? "line-through" : "none";

    const toggle = document.createElement("input");
    // toggle が変化 (change) した際に label.style.textDecorationLine を変更
    toggle.type = "checkbox";
    toggle.checked = status === "completed";
    toggle.onchange = () => {
      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
      saveTodos();
    };

    const destroy = document.createElement("button");
    // destroy がクリック (click) された場合に elem を削除
    destroy.textContent = "❌";
    destroy.onclick = () => {
      elem.remove();
      saveTodos();
    };

    // elem 内に toggle, label, destroy を追加
    const d = document.createElement("div");
    d.appendChild(toggle);
    d.appendChild(label);
    d.appendChild(destroy);
    elem.appendChild(d);
    list.prepend(elem);
  }

  const saveTodos = () => {
    const todos = [];
    list.querySelectorAll("li").forEach(li => {
      const id = li.dataset.id;
      const label = li.querySelector("label");
      const toggle = li.querySelector("input[type='checkbox']");
      const status = toggle.checked ? "completed" : "active";
      todos.push({ id, name: label.textContent, status });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  savedTodos.forEach(todo => addTodo2List(todo.id, todo.name, todo.status));
  
});

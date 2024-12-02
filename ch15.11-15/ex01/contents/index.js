const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const apiHost = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  fetch(apiHost + "/api/tasks")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`err: ${res.statusText} ${res.body.message}`);
      }
      return res.json();
    })
    .then((tasks) => {
      for (const task of tasks.items) {
        appendToDoItem(task);
      }
    })
    .catch((e) => {
      alert(e);
    });
});

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  fetch(apiHost + "/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ name: todo }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`err: ${res.statusText} ${res.body.message}`);
      }
      return res.json();
    })
    .then((task) => {
      appendToDoItem(task);
    })
    .catch((e) => alert(e));
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");
  elem.id = task.id;

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed" ? "checked" : "";
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", (ev) => {
    const _id = ev.target.closest("li").id;
    const _taskStatus = ev.target.checked ? "completed" : "active";
    fetch(apiHost + `/api/tasks/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id: Number(_id),
        status: `${_taskStatus}`,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`err: ${res.statusText} ${res.body.message}`);
        }
        return res.json();
      })
      .then((body) => {
        const isChecked = body.status === "completed";
        const elemLi = document.getElementById(Number(body.id));
        elemLi.querySelector('input[type="checkbox"]').checked = isChecked;
        elemLi.querySelector("label").style.textDecoration = isChecked
          ? "line-through"
          : "";
      })
      .catch((e) => alert(e));
  });

  const destroy = document.createElement("button");
  destroy.textContent = "x";
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", (ev) => {
    const _id = ev.target.closest("li").id;
    console.log(ev);
    fetch(apiHost + `/api/tasks/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`err: ${res.statusText} ${res.body.message}`);
        }
        document.getElementById(_id).remove();
      })
      .catch((e) => alert(e));
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  list.append(elem);
  elem.append(toggle, label, destroy);
}

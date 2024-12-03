const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const apiHost = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  const getAllTask = async () => {
    try {
      const res = await fetch(apiHost + "/api/tasks");
      if (!res.ok) {
        if (500 <= res.status && res.status < 600) {
          throw new Error(`server error: ${res.statusText}`);
        }
        throw new Error(`error: ${res.statusText} ${res.body.message}`);
      }
      const tasks = await res.json();
      for (const task of tasks.items) {
        appendToDoItem(task);
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  retryWithExponentialBackoff(3, () => getAllTask())
  .then(result => {
    console.log(result);
  })
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
  const createTask = async (todo) => {
    try {
      const res = await fetch(apiHost + "/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ name: todo }),
      });
      if (!res.ok) {
        throw new Error(`err: ${res.statusText} ${res.body.message}`);
      }
      const task = await res.json();
      appendToDoItem(task);
      return true;
    } catch (e) {
      alert(e);
      return false;
    }
  }
  retryWithExponentialBackoff(3, () => createTask(todo))
  .then(result => {
    console.log(result);
  })
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

    const changeTask = async (_id) => {
      try {
        const res = await fetch(apiHost + `/api/tasks/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            id: Number(_id),
            status: `${_taskStatus}`,
          }),
        });
        if (!res.ok) {
          throw new Error(`err: ${res.statusText} ${res.body.message}`);
        }
        const body = await res.json();
        const isChecked = body.status === "completed";
        const elemLi = document.getElementById(Number(body.id));
        elemLi.querySelector('input[type="checkbox"]').checked = isChecked;
        elemLi.querySelector("label").style.textDecoration = isChecked
          ? "line-through"
          : "";
      } catch (e) {
        return false;
      }
    }
    retryWithExponentialBackoff(3, () => changeTask(_id))
    .then(result => {
      console.log(result);
      if (!result) alert(result);
    })

  });

  const destroy = document.createElement("button");
  destroy.textContent = "x";
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", (ev) => {
    const _id = ev.target.closest("li").id;
    const deleteTask = async _id => {
      try {
        const res = await fetch(apiHost + `/api/tasks/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        });
        if (!res.ok) {
          if (500 <= res.status && res.status < 600) {
            throw new Error(`server error: ${res.statusText}`);
          }
          throw new Error(`error: ${res.statusText} ${res.body.message}`);
        }
        document.getElementById(_id).remove();
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
    retryWithExponentialBackoff(3, () => deleteTask(_id))
    .then(result => {
      console.log(result);
      if (result) {
        return;
      } else {
        throw new Error(`error: ${result}`);
      }
    })
    .catch(e => alert(e))
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  list.append(elem);
  elem.append(toggle, label, destroy);
}

// func関数を実行し続けるが、timeoutSec秒だけまっても成功しなければタイムアウトする
// funcをリトライする時にまつ時間はだんだん長くなる
export const retryWithExponentialBackoff = (
  timeoutSec,
  func,
) => {
  let trialTimes = 0;
  const startTime = Date.now();
  const timeout = timeoutSec * 1000;

  function execute(){
    return func().then((result) => {
      if (result === true) {
        // success!
        return true;
      }

      trialTimes++;
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime > timeout) {
        // timeout!
        return false;
      }

      const waitSec = Math.pow(2, trialTimes - 1) * 1000;
      return new Promise((resolve) => setTimeout(resolve, waitSec))
        .then(execute)
        .catch((error) => {
          console.log(`err ${error}`);
          return false;
        });
    });
  }

  return execute();
};
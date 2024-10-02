document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#new-todo-form");
  const list = document.querySelector("#todo-list");
  const input = document.querySelector("#new-todo");

  form.addEventListener("submit", (e) => {
    // form のイベントのキャンセルを実施
    // 最初にデフォルト動作のキャンセルを明確にし、途中エラーがあって抜けるなどしてキャンセル処理が飛ばされたりしないようにする
    // なおイベントリスナーの処理が終わるまでデフォルトの動作(ページのリロード)は保留される?
    e.preventDefault();

    // 両端からホワイトスペースを取り除いた文字列を取得する
    if (input.value.trim() === "") {
      return;
    }
    const todo = input.value.trim();
    // new-todo の中身は空にする
    input.value = "";

    // ここから #todo-list に追加する要素を構築する
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = todo;
    label.style.textDecorationLine = "none";

    const toggle = document.createElement("input");
    // toggle が変化 (change) した際に label.style.textDecorationLine を変更
    toggle.type = "checkbox";
    toggle.checked = false;
    toggle.onchange = () => {
      const v = label.style.textDecorationLine;
      label.style.textDecorationLine = v === "none" ? "line-through" : "none";
    };

    const destroy = document.createElement("button");
    // destroy がクリック (click) された場合に elem を削除
    destroy.textContent = "❌";
    destroy.onclick = () => {
      elem.remove();
    };

    // elem 内に toggle, label, destroy を追加
    const d = document.createElement("div");
    d.appendChild(toggle);
    d.appendChild(label);
    d.appendChild(destroy);
    elem.appendChild(d);
    list.prepend(elem);
  });
});

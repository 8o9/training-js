## 2
script タグから `type="module"` 属性を削除した場合、querySelectorの結果にaddEventListenerができずエラーになるため、DOMコンテンツが読み込まれてからそれらを実行するようにする。
もしくは<script>にdeferをつけてスクリプトがよ実行されるタイミングを遅らせる

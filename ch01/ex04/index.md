- 開発者ツールを開いていない状態でHTMLファイルを開いたとき、開発者ツールのコンソールには何も表示されないと思っていたが、実際は違って"Object"が2回出力されていた。answerは0、と記載してあった。
- 開発者ツールを開いたままリロードするとObjectの中身がそのまま表示され({answer: 42}や{answer: 0})answerも42と0だが、ツールを後から開くとObjectとだけ表示されanswerは共に0だった。
- 期待する結果を「デバッグなどのためにある時・行でのオブジェクト"life"の中身がわかること」とすると、思いついたのは以下。ただconsole.log()するのも含めてWebページ利用者にとって適切なものは思いつかなかった。
  - ブラウザ内のストレージに保存する(ex: `localStorage.setItem('log', JSON.stringify(life));`)
    - Webページの利用者からすると勝手にストレージを使われるのは好ましくない
  - HTMLに出力する(ex: `document.body.appendChild(document.createComment(JSON.stringify(life)));`)
    - デバッグ用のコメントが残るのは利用者からすると好ましくない
  - 通信を使ってサーバ側にlifeオブジェクトの中身を送信する
    - 通信量を無駄に消費してしまいWebサイトの利用者からすると好ましくない

fix:

- see: https://developer.mozilla.org/ja/docs/Web/API/console/log_static

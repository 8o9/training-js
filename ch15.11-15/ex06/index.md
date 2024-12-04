## 
> localStorage と sessionStorage それぞれに保存されたデータの有効期限がどのように異なるか、実際に動作確認して結果を記述しなさい。
- Chrome タブのリロード
  - sessionStorageもToDoは消えない
- Chrome タブを閉じて再度開く
  - sessionStorageもToDoは消えない（再現する）
- Chrome 別のタブで開く
  - sessionStorageの方はデータは再現しない（ToDoが空になる）
> localStorage は sessionStorage によく似ていますが、 localStorage のデータには期限がないのに対し、 sessionStorage のデータはページセッションが終了したとき、すなわちページが閉じられたときにクリアされます。
  - [Window: localStorage プロパティ](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage)
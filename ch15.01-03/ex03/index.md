- セキュリティ機能があるとどのような攻撃を防御できるか
  - .jsファイルが改竄されていた時の検知と実行の防止ができる
  - .htmlファイルが改竄されてintegrityのハッシュ値が変わって悪意のある.jsファイルが実行...とも考えたが、そうなっている時点でもう終わりなのでそうならないように対策すべき?

- 同ディレクトリのserver.jsでnode server.jsと実行してhttp://localhost:7900をブラウザで開く
  - index2.jsの方は利用できずにブラウザにブロックされる
    - `localhost/:1 Failed to find a valid digest in the 'integrity' attribute for resource 'http://localhost:7900/index2.js' with computed SHA-256 integrity 'CbOxAdBh97u3pXPAfzZeQHMfHSqKgL7Z1LRWQ5XCHlo='. The resource has been blocked.`
 
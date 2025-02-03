## package-lock.jsonとは
- https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json
- バージョン管理されたパッケージの依存関係のツリーを保存し、ファイルだけで他のマシンなどでも環境を再現しやすくするもの
  - 個人的には"^"や"~"を使うことで他のマシンとバージョンが少し異なってしまうこともあるのが気になる
- package.jsonやnode_modules以下が変更されると自動で再生成されることが多い

## リポジトリにpackage-lock.jsonをコミットするべきか
- https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json
- Yes


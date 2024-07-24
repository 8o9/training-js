noneはソースコード部分に最適化は見られない。requireした外部モジュールもそのままコピペしている
developmentはeval()を利用しているのと、ソースコード部分は1行になっている。外部モジュールも1行になっている
productionはnone, devで見られるような不要なコメントやwebpack独自のコードのようなものはなく、またソースコードも最適化されている（変数名の置き換えなど）


- ref(あんまり参考にならんかった):
  - https://webpack.js.org/configuration/mode/


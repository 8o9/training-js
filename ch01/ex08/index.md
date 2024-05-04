# 実行内容

- [江戸川乱歩の"怪奇四十面相"](https://www.aozora.gr.jp/cards/001779/card56673.html)をnkfでUTF-8に変換し、
  - `cat kaiki_yonju_menso.txt|nkf -w > utf8_kaiki_yonju_menso.txt`
- 変換プログラムを実行した
  - `cat utf8_kaiki_yonju_menso.txt | npx node --loader ts-node/esm index.ts`
  - Node.jsは21.6.2

# 結果

以下のように表示された。漢字が含まれる本だが、ヒストグラムには表示されていない。「、」が一番多いのは言われてみると確かにと思った

```
(node:11878) ExperimentalWarning: `--experimental-loader` may be removed in the future; instead use `register()`:
--import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));'
(Use `node --trace-warnings ...` to show where the warning was created)
、: ####### 7.44%
の: ##### 4.63%
い: ### 3.43%
し: ### 3.11%
た: ### 2.90%
。: ### 2.82%
と: ### 2.51%
ま: ## 2.42%
て: ## 2.42%
か: ## 2.27%
で: ## 2.16%
に: ## 2.11%
な: ## 2.07%
が: ## 2.03%
は: ## 1.91%
う: ## 1.90%
す: ## 1.80%
っ: ## 1.64%
を: # 1.46%
こ: # 1.44%
ん: # 1.42%
り: # 1.31%
る: # 1.29%
も: # 1.27%
ら: # 1.21%
そ: # 1.18%
く: # 1.12%
き: # 1.11%
れ: # 1.08%
あ: # 1.08%
```

toString()を使うと関数の実装内容が表示されたが、組み込み関数では`[native code]`のように表示された

```
> myf = () => {return 2;}
() => {return 2;}

> myf.toString();
'() => {return 2;}'

> Date.now()
1719859679649

> Date.now().toString()
'1719859684901'

> Date.toString()
'function Date() { [native code] }'
```

- exapmle.txt(`this is example file`と記載したテキストファイル)100バイトに拡張した結果、以下のようになった
- 0というのはASCIIコードの0x00でNULL文字であることがわかった

```
❯ xxd example.txt
00000000: 7468 6973 2069 7320 6578 616d 706c 6520  this is example
00000010: 6669 6c65 2e0a 0000 0000 0000 0000 0000  file............
00000020: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000030: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000040: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000050: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000060: 0000 0000                                ....
```

## 最大のクライアント数
`maxClients.js`で試したところ、以下のようになった。
```
Client 9934 error: read ECONNRESET
Client 2376 connected
Client 9908 error: read ECONNRESET
Client 9903 error: read ECONNRESET
Client 9974 error: read ECONNRESET
Client 9940 error: read ECONNRESET
Client 3364 connected
...
Client 6330 connected
Client 6903 connected
Client 8956 connected
Client 9025 connected
Total connected clients: 9161
```

## 考察
- 様々な要因で数が決まると推察される。マシンの性能、ネットワークの設定やNode.jsのサーバプロセスに割り当てられたメモリ量やキューの大きさなど
- [https://www.reddit.com/r/golang/comments/r9u4ee/how_many_actively_connected_http_clients_can_a_go/](https://www.reddit.com/r/golang/comments/r9u4ee/how_many_actively_connected_http_clients_can_a_go/)
* DevToolsのConsoleを開く

* コンソールで3つのコードを実行

* 自動スクロール
  * 例：`_xScroll.start(90000, 600)` → 約90秒間、0.6秒ごとに下へスクロール
  * 途中で止めるとき：`_xScroll.stop()`

* 件数を確認：`_xMon.count()`
* 収集監視を終了：`_xMon.stop()`

* ダウンロード：

  ```
  downloadAll(_xMon.list, 600)
  ```

  * 第2引数はダウンロード間隔（ミリ秒）



* CORS等で失敗時は画像を新規タブで順に開く：

  ```
  _xMon.list.forEach((u,i)=>setTimeout(()=>window.open(u,'_blank'), i*800));
  ```

---

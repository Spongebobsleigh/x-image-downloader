* DevToolsのConsoleを開く

* Consoleでauto_scrollとdownload_allのコードを実行

* 収集開始：
  * start_collectingのコードを実行

* 自動スクロール
  ```
  _xScroll.start(90000, 600)
  ```

  * 90秒間、0.6秒ごとに下へスクロール
  * 途中で停止：`_xScroll.stop()`
  * 件数を確認：`_xMon.count()`
 
* 収集監視を終了：
  
  ```
  _xMon.stop()
  ```

* ダウンロード：

  ```
  downloadAll(_xMon.list, 600)
  ```


* CORS等で失敗時は画像を新規タブで順に開く：

  ```
  _xMon.list.forEach((u,i)=>setTimeout(()=>window.open(u,'_blank'), i*800));
  ```

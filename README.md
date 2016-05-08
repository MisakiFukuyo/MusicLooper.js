# MusicLooper.js

MusicLooper.js / 曲の終わり際で自然に初めの方に戻って無限ループしてくれる奴.js

## Screenshot / スクリーンショット

<img src='https://raw.githubusercontent.com/TakafumiFukuyo/MusicLooper.js/master/screenshot.jpg'>

## Usage / 使い方

### 1. Change source / ソースの変更

Change source as follows.

以下のようにソースを変更します。

    // Set your hosting server address and path. Generally, if you use local server, write here 'http://localhost:portNumber/songs/'.
    // サーバアドレスとパスを書きます。一般的に言って、もしあなたがローカルサーバを用いるなら 'http://localhost:ポート番号/songs/' になります。
    var baseURL = 'http://localhost:8080/songs/'

    var songs = [
      {
         // Write filename under songs directory.
         // songs ディレクトリ下の曲名を書きます
         name : '01-Burst The Gravity.m4a',
         // Loop start timing
         // ループの最初の時点です
         start : 15.3,
         // Return to loop start timing.
         // 最初に戻る時点です
         end : 248.8
      }
    ]
    // Select a song from songs array.
    // 曲の配列から1つ選びます。
    var song = songs[0];


    // Options use for fitting loop start / end
    // 曲フィッティング用のオプションです
    // If this value is true, start playing at loop start timing
    // この値をtrueにすると、曲の再生はループの最初の時点から始まります
    var fittingStart = false;
    // If this value is true, start playing at before fittingEndTiming [sec] to return to loop start timing
    // この値をtrueにすると、曲の再生は最初に戻る時点から fittingEndTiming [秒] 前の時点から始まります
    var fittingEnd = false;
    var fittingEndTiming = 4;

### 2. ローカルサーバでのホスティングとアクセス

Hosting your server at your local machine.

ローカルにサーバを立てます。

Example by Python2.

Python2の例です。

    python -m SimpleHTTPServer 8080


Example by Python3.

Python3の例です。

    python3 -m http.server 8080

Example by Node.

Nodeの例です

Install http-server module to global (only at first).

http-serverモジュールをグローバルにインストールします(最初の一度だけ)。

    npm install http-server -g

Start http-server.

http-serverを起動します。

    http-server -p 8080

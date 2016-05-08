(function(){
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();
  
  var baseURL = 'http://localhost:8080/songs/'
  var songs = [
    // {
    //   name : '01-Burst The Gravity.m4a',
    //   start : 15.3,
    //   end : 248.8
    // }
  ]
  var song = songs[0];

  var fittingStart = false;
  var fittingEnd = false;
  var fittingEndTiming = 4;

  function infoText(name,start,end){
    document.querySelector('#LoopMusic').textContent = name
    document.querySelector('#LoopTimingStart').textContent = start
    document.querySelector('#LoopTimingEnd').textContent = end
    document.querySelector('#LoopCount').textContent = '1'
    setTimeout(function(){
      setInterval(function(){
        var i = parseInt(document.querySelector('#LoopCount').textContent)
        document.querySelector('#LoopCount').textContent = '' + (i + 1);
      },(end-start) * 1000);
    },start * 1000);
  }

  function playSoundFitting(buffer,start,end) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.loop = true;
    source.loopStart = start;
    source.loopEnd = end;
    if(fittingStart){
      source.start(0,start);
    }else if(fittingEnd){
      source.start(0,end - fittingEndTiming );
    }
  }

  function playSound(buffer,start,end) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.loop = true;
    source.loopStart = start;
    source.loopEnd = end;
    source.start(0);
  }

  window.addEventListener('load',function(){
    var request = new XMLHttpRequest();
    request.open('GET', baseURL + song.name, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        if(fittingStart || fittingEnd ){
          playSoundFitting(buffer,song.start,song.end);
        }else{
          playSound(buffer,song.start,song.end);
        }
        infoText(song.name,song.start,song.end)
      }, function(){console.log('XMLHttpRequest error')});
    }
    request.send();
  });
})();

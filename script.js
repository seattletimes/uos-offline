var videoTemplate = function(data) {
  return `
  <div class="video-container">
    <h2 class="title">${data.title}</h2>
    <div class="aspect">
      <video preload="metadata">
        <source src="${data.source}"></source>
        <track src="${data.caption}"></track>
      </video>
    </div>
  </div>
  `;
};

var words = document.querySelector(".word.videos");

for (var i = 0; i < 5; i++) {
  words.innerHTML += videoTemplate({ source: "./small.mp4" });
}

var $ = s => [].slice.call(document.querySelectorAll(s));
var fullscreen = document.body.webkitRequestFullscreen ? "webkitRequestFullscreen" : "requestFullscreen";

var playing = null;
var onClick = function() {
  this.play();
  this[fullscreen]();
  this.setAttribute("controls", "");
  playing = this;
};

var onStop = function() {
  console.log("stop", this);
  this.removeAttribute("controls");
  this.currentTime = 0;
}

var onExit = function() {
  if (!playing || document.fullscreenElement || document.webkitFullscreenElement) return;
  playing.pause();
  playing.currentTime = 0;
  onStop.call(playing);
  playing = null;
};

var videos = $("video")

videos.forEach(function(element) {
  element.addEventListener("click", onClick);
  element.addEventListener("pause", onStop);
});

document.addEventListener("fullscreenchange", onExit);
document.addEventListener("webkitfullscreenchange", onExit);
var videoTemplate = function(data) {
  return `
  <div class="video-container">
    <h2 class="title">${data.title || "..."}</h2>
    <div class="aspect">
      <video preload="metadata" poster="">
        <source src="${data.video}"></source>
        <track default kind="captions" label="CC" src="${data.caption}"></track>
      </video>
    </div>
  </div>
  `;
};

var words = {
  "Ally": { video: "20160614_Ally.mp4", caption: "ALLY-captions.vtt" },
  "All lives matter": { video: "20160614_AllLivesMatter.mp4", caption: "ALLLIVESMATTER-captions.vtt" },
  "Colorblindness": { video: "20160614_Colorblindness_CC.mp4", caption: "COLORBLIND-captions.vtt" },
  "Diversity": { video: "20160613_diversity.mp4", caption: "DIVERSITY-captions.vtt" },
  "Microaggression": { video: "20160613_microaggression.mp4", caption: "MICROAGGRESSION-captions.vtt" },
  "Person of color": { video: "20160614_Person of Color_CC.mp4", caption: "POC-captions.vtt" },
  "Politically correct": { video: "20160616_Politically_Correct.mp4", caption: "PC-captions.vtt" },
  "Racism": { video: "20160616_Racism.mp4", caption: "RACISM-captions.vtt" },
  "Racist": { video: "20160613_racist.mp4", caption: "RACIST-captions.vtt" },
  "Safe space": { video: "20160614_safe space.mp4", caption: "SAFESPACE-captions.vtt" },
  "White privilege": { video: "20160613_white privilege.mp4", caption: "WHITEPRIVILEGE-captions.vtt" },
  "White fragility": { video: "20160614_White Fragility_CC.mp4", caption: "FRAGILITY-captions.vtt" }
};

var wordContainer = document.querySelector(".word.videos");

for (var title in words) {
  var word = words[title];
  var video = "./videos/words/" + word.video;
  var caption = "./videos/words/" + word.caption;
  wordContainer.innerHTML += videoTemplate({ title, video, caption });
}

var $ = s => [].slice.call(document.querySelectorAll(s));
var fullscreen = document.body.webkitRequestFullscreen ? "webkitRequestFullscreen" : "requestFullscreen";
var exitFullscreen = document.webkitExitFullscreen ? "webkitExitFullscreen" : "exitFullscreen";
var fullscreenElement = "webkitFullscreenElement" in document ? "webkitFullscreenElement" : "fullscreenElement";

var playing = null;
var onClick = function() {
  if (document[fullscreenElement] == this) return;
  console.log(this);
  this[fullscreen]();
  this.play();
  this.setAttribute("controls", "");
  playing = this;
};

var onExit = function() {
  console.log("exit", document[fullscreenElement], playing);
  if (document[fullscreenElement]) return;
  playing.pause();
  playing.currentTime = 0;
  playing.removeAttribute("controls");
  playing.currentTime = 0;
  playing = null;
};

var videos = $("video")

videos.forEach(function(element) {
  element.addEventListener("click", onClick);
});

document.addEventListener("fullscreenchange", onExit);
document.addEventListener("webkitfullscreenchange", onExit);
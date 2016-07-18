var videoTemplate = function(data) {
  return `
  <div class="video-container">
    <h3 class="title">${data.title || "..."}</h3>
    <div class="aspect">
      <video class="video" preload="metadata" poster="">
        <source src="${data.video}"></source>
        <track default kind="captions" label="CC" src="${data.caption}"></track>
      </video>
    </div>
  </div>
  `;
};

var words = {
  "Institutional racism": { video: "20160616_Racism.mp4", caption: "RACISM-captions.vtt" },
  "Person of color": { video: "20160614_Person of Color_CC.mp4", caption: "POC-captions.vtt" },
  "Racist": { video: "20160613_racist.mp4", caption: "RACIST-captions.vtt" },
  "Ally": { video: "20160614_Ally.mp4", caption: "ALLY-captions.vtt" },
  "Microaggression": { video: "20160613_microaggression.mp4", caption: "MICROAGGRESSION-captions.vtt" },
  "All lives matter": { video: "20160614_AllLivesMatter.mp4", caption: "ALLLIVESMATTER-captions.vtt" },
  "Politically correct": { video: "20160616_Politically_Correct.mp4", caption: "PC-captions.vtt" },
  "Colorblindness": { video: "20160614_Colorblindness_CC.mp4", caption: "COLORBLIND-captions.vtt" },
  "Safe space": { video: "20160614_safe space.mp4", caption: "SAFESPACE-captions.vtt" },
  "Diversity": { video: "20160613_diversity.mp4", caption: "DIVERSITY-captions.vtt" },
  "White privilege": { video: "20160613_white privilege.mp4", caption: "WHITEPRIVILEGE-captions.vtt" },
  "White fragility": { video: "20160614_White Fragility_CC.mp4", caption: "FRAGILITY-captions.vtt" }
};

var people = {
  "Duck Bae": { video: "20160616_Racism.mp4", caption: "RACISM-captions.vtt" },
  "Autumn Bennett": { video: "20160614_Person of Color_CC.mp4", caption: "POC-captions.vtt" },
  "Keli Carender": { video: "20160613_racist.mp4", caption: "RACIST-captions.vtt" },
  "Louis Chude-Sokei": { video: "20160614_Ally.mp4", caption: "ALLY-captions.vtt" },
  "Jerrell Davis": { video: "20160613_microaggression.mp4", caption: "MICROAGGRESSION-captions.vtt" },
  "Rachael DeCruz": { video: "20160614_AllLivesMatter.mp4", caption: "ALLLIVESMATTER-captions.vtt" },
  "Michael Dixon": { video: "20160616_Politically_Correct.mp4", caption: "PC-captions.vtt" },
  "Leija Farr": { video: "20160614_Colorblindness_CC.mp4", caption: "COLORBLIND-captions.vtt" },
  "M. Lorena Gonzalez": { video: "20160614_safe space.mp4", caption: "SAFESPACE-captions.vtt" },
  "Darrell Hillaire": { video: "20160613_diversity.mp4", caption: "DIVERSITY-captions.vtt" },
  "Varisha Khan": { video: "20160613_white privilege.mp4", caption: "WHITEPRIVILEGE-captions.vtt" },
  "Lucas Nydam": { video: "20160614_White Fragility_CC.mp4", caption: "FRAGILITY-captions.vtt" },
  "Mark Olsen": { video: "20160614_Colorblindness_CC.mp4", caption: "COLORBLIND-captions.vtt" },
  "Marci Owens": { video: "20160614_safe space.mp4", caption: "SAFESPACE-captions.vtt" },
  "Greg Rickel": { video: "20160613_diversity.mp4", caption: "DIVERSITY-captions.vtt" },
  "Sean Riley": { video: "20160613_white privilege.mp4", caption: "WHITEPRIVILEGE-captions.vtt" },
  "Cynthia Tee": { video: "20160614_White Fragility_CC.mp4", caption: "FRAGILITY-captions.vtt" },
  "Tariqa Waters": { video: "20160614_Colorblindness_CC.mp4", caption: "COLORBLIND-captions.vtt" }
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
  var video = this.getElementsByClassName('video')[0];
  if (document[fullscreenElement] == video) return;
  video[fullscreen]();
  video.play();
  video.setAttribute("controls", "");
  playing = video;
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

$(".video-container").forEach(function(element) {
  element.addEventListener("click", onClick);
});

document.addEventListener("fullscreenchange", onExit);
document.addEventListener("webkitfullscreenchange", onExit);
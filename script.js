// helpers
var $ = s => [].slice.call(document.querySelectorAll(s));
var noop = function() {};
var ease = v => 0.5 - Math.cos( v * Math.PI ) / 2;

// global state
var playing = null;
var idle = null;
var animating = false;

// check for idle, scroll to the top after five minutes
var idleExpired = function() {
  if (playing) return resetIdle();
  document.body.scrollTop = document.documentElement.scrollTop = 0;
};

var resetIdle = function() {
  clearTimeout(idle);
  idle = setTimeout(idleExpired, 1000 * 60 * 5); // five minute idle timeout
};
window.addEventListener("mousemove", resetIdle);
window.addEventListener("scroll", resetIdle);

var getScroll = () => document.body.scrollTop || document.documentElement.scrollTop || 0;

var animateScroll = function(element, done = noop) {
  if (animating) return;
  if (typeof element == "string") element = document.querySelector(element);

  var start = getScroll();
  var now = Date.now();
  var duration = 800;

  var frame = function() {
    var t = Date.now();
    var elapsed = t - now;
    var d = elapsed / duration;
    var bounds = element.getBoundingClientRect();
    var offset = bounds.top + getScroll();
    var distance = offset - start - 70;
    document.body.scrollTop = document.documentElement.scrollTop = start + distance * ease(d);
    if (elapsed > duration) {
      setTimeout(() => document.body.scrollTop = document.documentElement.scrollTop = start + distance, 10);
      return animating = false;
    }
    requestAnimationFrame(frame);
  };

  animating = true;
  frame();
};

// create the video containers
var wordTemplate = function(data) {
  return `
  <div class="video-container">
    <div class="title">${data.title || "..."}</div>
    <div class="fullscreen-container">
      <div class="close">X</div>
      <video class="video" preload="none" poster="">
        <source src="${data.video}"></source>
        <track default label="CC" src="${data.caption}"></track>
      </video>
    </div>
  </div>
  `;
};

var bioTemplate = function(data) {
  return `
  <div class="video-container">
    <img src="${data.still}">
    <div class="fullscreen-container">
      <div class="close">X</div>
        <video class="video" preload="none" poster="">
        <source src="${data.video}"></source>
      </video>
    </div>
    <h3 class="name">${data.name || "..."}</h3>
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
  "Duck Bae": { video: "duck_bio.mp4", caption: "RACISM-captions.vtt", still: "duck_still" },
  "Autumn Bennett": { video: "Autumn_bio.mp4", caption: "POC-captions.vtt", still: "autumn_still" },
  "Keli Carender": { video: "keli_bio.mp4", caption: "RACIST-captions.vtt", still: "keli_still" },
  "Louis Chude-Sokei": { video: "Louis_bio.mp4", caption: "ALLY-captions.vtt", still: "louis_still" },
  "Jerrell Davis": { video: "Jerrell_bio.mp4", caption: "MICROAGGRESSION-captions.vtt", still: "jerrell_still" },
  "Rachael DeCruz": { video: "rachael_bio.mp4", caption: "ALLLIVESMATTER-captions.vtt", still: "rachael_still" },
  "Michael Dixon": { video: "michael_bio.mp4", caption: "PC-captions.vtt", still: "michael_still" },
  "Leija Farr": { video: "leija_bio.mp4", caption: "COLORBLIND-captions.vtt", still: "leija_still" },
  "M. Lorena Gonzalez": { video: "lorena_bio.mp4", caption: "SAFESPACE-captions.vtt", still: "lorena_still" },
  "Darrell Hillaire": { video: "darrell_bio.mp4", caption: "DIVERSITY-captions.vtt", still: "darrell_still" },
  "Varisha Khan": { video: "varisha_bio.mp4", caption: "WHITEPRIVILEGE-captions.vtt", still: "varisha_still" },
  "Lucas Nydam": { video: "lucas_bio.mp4", caption: "FRAGILITY-captions.vtt", still: "lucas_still" },
  "Mark Olsen": { video: "mark_bio.mp4", caption: "COLORBLIND-captions.vtt", still: "mark_still" },
  "Marci Owens": { video: "marci_bio.mp4", caption: "SAFESPACE-captions.vtt", still: "marci_still" },
  "Greg Rickel": { video: "greg_bio.mp4", caption: "DIVERSITY-captions.vtt", still: "greg_still" },
  "Sean Riley": { video: "sean_bio.mp4", caption: "WHITEPRIVILEGE-captions.vtt", still: "sean_still" },
  "Cynthia Tee": { video: "cynthia_bio.mp4", caption: "FRAGILITY-captions.vtt", still: "cynthia_still" },
  "Tariqa Waters": { video: "20160613_tariqa_bio.mp4", caption: "COLORBLIND-captions.vtt", still: "tariqa_still" }
};

var wordContainer = document.querySelector(".word.videos");

for (var title in words) {
  var word = words[title];
  var video = "./videos/words/" + word.video;
  var caption = "./videos/words/" + word.caption;
  wordContainer.innerHTML += wordTemplate({ title, video, caption });
}

var bioContainer = document.querySelector(".bio.videos");

for (var name in people) {
  var person = people[name];
  var video = "./videos/bios/" + person.video;
  var caption = "";
  var still = "./stills/" + person.still + ".jpg";
  bioContainer.innerHTML += bioTemplate({ name, video, still });
}

var fullscreen = "requestFullscreen" in document.body ? "requestFullscreen" : "webkitRequestFullscreen";
var exitFullscreen = "exitFullscreen" in document ? "exitFullscreen" : "webkitExitFullscreen";
var fullscreenElement = "fullscreenElement" in document ? "fullscreenElement" : "webkitFullscreenElement";

var onClick = function() {
  this.classList.add("active");
  var video = this.querySelector(".video");
  if (document[fullscreenElement] == video) return;
  this.querySelector(".fullscreen-container")[fullscreen]();
  video.play();
  video.setAttribute("controls", "");
  playing = video;
};

var onExit = function() {
  $(".video-container.active").forEach(el => el.classList.remove("active"));
  if (!playing) return;
  playing.pause();
  playing.currentTime = 0;
  playing.removeAttribute("controls");
  playing.currentTime = 0;
  playing = null;
};

var onFullscreenChange = function() {
  if (document[fullscreenElement]) return;
  onExit();
}

$(".video-container").forEach(function(element) {
  element.addEventListener("click", onClick);
});
$("video").forEach(function(v) {
  v.addEventListener("ended", function() {
    document[exitFullscreen]();
    onExit();
  });
})
$(".close").forEach(function(element) {
  element.addEventListener("click", function(e) {
    document[exitFullscreen]();
    onExit();
    e.stopPropagation();
  });
})

document.querySelector(".start").addEventListener("click", function() {
  animateScroll("#project");
});

document.addEventListener("fullscreenchange", onFullscreenChange);
document.addEventListener("mozfullscreenchange", onFullscreenChange);
document.addEventListener("webkitfullscreenchange", onFullscreenChange);
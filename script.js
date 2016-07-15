var videoTemplate = function(data) {
  return `
  <div class="video-container">
    <h2 class="title">${data.title}</h2>
    <div class="aspect">
      <video>
        <source src="${data.source}"></source>
        <track src="${data.caption}"></track>
      </video>
    </div>
  </div>
  `;
};

var words = document.querySelector(".word.videos");

for (var i = 0; i < 20; i++) {
  words.innerHTML += videoTemplate({});
}
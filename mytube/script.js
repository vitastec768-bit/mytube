// СТАРТОВІ ВІДЕО
const videos = [
  {
    id: "1",
    title: "МУРЧИК.ЄХЕ – трейлер",
    channel: "Мій канал",
    thumb: "https://via.placeholder.com/480x270/ff4444/ffffff?text=MURCHIK.EXE",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "2",
    title: "Devlog #1 – роблю хорор гру",
    channel: "DevLogs",
    thumb: "https://via.placeholder.com/480x270/4444ff/ffffff?text=DEVLOG",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

const videoListEl = document.getElementById("videoList");
const searchInput = document.getElementById("searchInput");

const uploadBtn = document.getElementById("uploadBtn");
const uploadForm = document.getElementById("uploadForm");
const saveVideo = document.getElementById("saveVideo");

const titleInput = document.getElementById("titleInput");
const channelInput = document.getElementById("channelInput");
const thumbInput = document.getElementById("thumbInput");
const videoInput = document.getElementById("videoInput");

uploadBtn.addEventListener("click", () => {
  uploadForm.classList.toggle("hidden");
});

saveVideo.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const channel = channelInput.value.trim();
  const thumbFile = thumbInput.files[0];
  const videoFile = videoInput.files[0];

  if (!title || !channel || !thumbFile || !videoFile) {
    alert("Заповни всі поля!");
    return;
  }

  const thumbURL = URL.createObjectURL(thumbFile);
  const videoURL = URL.createObjectURL(videoFile);

  videos.push({
    id: Date.now().toString(),
    title,
    channel,
    thumb: thumbURL,
    url: videoURL
  });

  renderVideos(videos);

  uploadForm.classList.add("hidden");
  titleInput.value = "";
  channelInput.value = "";
  thumbInput.value = "";
  videoInput.value = "";
});

function renderVideos(list) {
  videoListEl.innerHTML = "";
  list.forEach(v => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <img class="thumb" src="${v.thumb}">
      <div class="video-info">
        <div class="video-title">${v.title}</div>
        <div class="video-channel">${v.channel}</div>
      </div>
    `;
    card.addEventListener("click", () => openPlayer(v));
    videoListEl.appendChild(card);
  });
}

function openPlayer(video) {
  const win = window.open("", "_blank");
  win.document.write(`
    <html>
    <head>
      <title>${video.title}</title>
      <style>
        body { margin:0; background:#000; color:#fff; font-family:system-ui; }
        .wrap { padding:16px; }
        video { width:100%; height:auto; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <video controls src="${video.url}"></video>
        <h2>${video.title}</h2>
        <p>${video.channel}</p>
      </div>
    </body>
    </html>
  `);
}

searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(q) ||
    v.channel.toLowerCase().includes(q)
  );
  renderVideos(filtered);
});

renderVideos(videos);

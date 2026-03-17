const movieData = {
  movie01: { title: "關於我和鬼變成家人的那件事", duration: 130, rating: "輔導級" },
  movie02: { title: "鈴芽之旅", duration: 121, rating: "普遍級" },
  movie03: { title: "馴龍高手", duration: 125, rating: "普遍級" },
  movie04: { title: "星際寶貝：史迪奇", duration: 108, rating: "保護級" },
  movie05: { title: "不可能的任務：最終清算", duration: 170, rating: "輔導級" },
  movie06: { title: "滿血復活", duration: 104, rating: "限制級" },
  movie07: { title: "絕命終結站 血脈", duration: 110, rating: "限制級" },
  movie08: { title: "怪奇艾瑪", duration: 79, rating: "普遍級" }
};

const movieColors = {
  movie01: "#3A67E5",
  movie02: "#4CB4FF",
  movie03: "#9C4F27",
  movie04: "#5877C0",
  movie05: "#FF6A5E",
  movie06: "#47A87A",
  movie07: "#BA4B82",
  movie08: "#D5B125"
};

function generateTimeLabels() {
  const labelContainer = document.getElementById("timeLabels");
  labelContainer.innerHTML = "";
  for (let h = 8; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const label = document.createElement("div");
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      label.textContent = `${hh}:${mm}`;
      labelContainer.appendChild(label);
    }
  }
}

function updateTimeline(dateStr) {
  const schedules = JSON.parse(localStorage.getItem("schedules")) || [];
  const filtered = schedules.filter((s) => s.date === dateStr);
  const rows = document.querySelectorAll(".time-row");
  rows.forEach((row) => (row.innerHTML = ""));

  filtered.forEach((s) => {
    const movie = movieData[s.title] || { title: s.title, duration: 90 };
    const room = s.room;
    const time = s.time;

    const [hour, minute] = time.split(":").map(Number);
    const startMin = hour * 60 + minute;
    const col = (startMin - 480) / 30;

    const block = document.createElement("div");
    block.className = "movie-block";
    block.style.left = `${col * 80}px`;
    block.style.width = `${(movie.duration / 30) * 80}px`;

    block.style.backgroundColor = movieColors[s.title] || "#5a9bd6";
    block.style.color = "#fff";

    const rating = movie.rating || "未分級";
    block.innerHTML = `
      <span class="movie-title">${movie.title}</span>
      <span class="info">⏱ ${movie.duration} mins ｜${rating}</span>
    `;

    const targetRow = document.querySelector(`.time-row[data-room="${room}"]`);
    if (targetRow) targetRow.appendChild(block);
  });
}

document.getElementById("filterDate").addEventListener("change", (e) => {
  const selected = e.target.value;
  updateTimeline(selected);
});

generateTimeLabels();
document.getElementById("filterDate").value = "";

// 顯示／隱藏排片內容區塊
document.getElementById("toggleTimelineBtn").addEventListener("click", () => {
  const section = document.getElementById("timelineSection");
  const btn = document.getElementById("toggleTimelineBtn");
  const isVisible = section.style.display === "block";
  section.style.display = isVisible ? "none" : "block";
  btn.textContent = isVisible ? "📊 預覽排片摘要" : "📊 隱藏排片摘要";
});


if (localStorage.getItem('isLoggedIn') !== 'true') {
  location.href = "index.html"; // 或導回 login.html
}
function logout() {
  localStorage.removeItem('isLoggedIn');
  location.href = "index.html";
}
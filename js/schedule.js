const scheduleForm = document.getElementById('scheduleForm');
const scheduleList = document.getElementById('scheduleList');

// ✅ 僅保留此對應表即可
const movieData = {
  movie01: { title: "關於我和鬼變成家人的那件事" },
  movie02: { title: "鈴芽之旅" },
  movie03: { title: "馴龍高手" },
  movie04: { title: "星際寶貝：史迪奇" },
  movie05: { title: "不可能的任務：最終清算" },
  movie06: { title: "滿血復活" },
  movie07: { title: "絕命終結站 血脈" },
  movie08: { title: "怪奇艾瑪" }
};

let schedules = JSON.parse(localStorage.getItem('schedules')) || [];

// 表單送出事件
scheduleForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const titleCode = document.getElementById('movieTitle').value.trim();
  const room = document.getElementById('room').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!titleCode || !date || !time) {
    alert('請填寫所有欄位');
    return;
  }

  const newSchedule = {
    title: titleCode,
    room,
    date,
    time,
  };

  schedules.push(newSchedule);
  localStorage.setItem('schedules', JSON.stringify(schedules));
  updateScheduleList();
  scheduleForm.reset();
});

// 顯示排片清單（依照時間排序＋中文名稱）
function updateScheduleList() {
  const list = document.getElementById("scheduleList");
  list.innerHTML = "";

  const schedules = JSON.parse(localStorage.getItem("schedules")) || [];

  schedules.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  schedules.forEach((s) => {
    const movie = movieData[s.title] || { title: s.title };
    const li = document.createElement("li");
    li.textContent = `${s.date} ${s.time}｜（${s.room} 廳）${movie.title}`;
    list.appendChild(li);
  });
}

// 初始載入
updateScheduleList();

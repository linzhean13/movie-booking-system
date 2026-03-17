const scheduleSelect = document.getElementById('scheduleSelect');
const seatMap = document.getElementById('seatLayout');
const saveBtn = document.getElementById('saveSeats');

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let currentScheduleId = '';
let seatStatus = {};

// 中文片名對應表
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

// 載入排片選單
const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
schedules.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

// 加入預設選項
const defaultOption = document.createElement('option');
defaultOption.value = '';
defaultOption.textContent = '請選擇場次...';
scheduleSelect.appendChild(defaultOption);

schedules.forEach((s, index) => {
  const option = document.createElement('option');
  const movie = movieData[s.title]?.title || s.title;
  option.value = index;
  option.textContent = `${s.date} ${s.time}｜（${s.room} 廳）${movie}`;
  scheduleSelect.appendChild(option);
});

scheduleSelect.addEventListener('change', () => {
  if (!scheduleSelect.value) return;
  currentScheduleId = scheduleSelect.value;
  loadSeats(currentScheduleId);
});

// 載入座位圖（14列 x 8排）
function loadSeats(id) {
  seatMap.innerHTML = '';
  seatStatus = JSON.parse(localStorage.getItem('seats_' + id)) || {};
  const columns = 14;
  // 上方數字欄
  const headerRow = document.createElement('div');
  headerRow.className = 'seat-row';
  headerRow.innerHTML = '<div class="seat-label"></div>';
  for (let i = 1; i <= columns; i++) {
    const cell = document.createElement('div');
    cell.className = 'seat-label';
    cell.textContent = i;
    headerRow.appendChild(cell);
  }
  seatMap.appendChild(headerRow);
  // 生成座位列
  for (let row of rows) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'seat-row';
    const label = document.createElement('div');
    label.className = 'seat-label';
    label.textContent = row;
    rowDiv.appendChild(label);
    for (let i = 1; i <= columns; i++) {
      const seatId = row + i;
      const div = document.createElement('div');
      div.className = 'seat';
      div.dataset.id = seatId;
      const status = seatStatus[seatId] || 'available';
      div.classList.add(status);
      div.addEventListener('click', () => {
        toggleStatus(div);
      });
      rowDiv.appendChild(div);
    }
    seatMap.appendChild(rowDiv);
  }
}

function toggleStatus(seatDiv) {
  const id = seatDiv.dataset.id;
  let current = seatStatus[id] || 'available';

  let next = current === 'available' ? 'sold' :
              current === 'sold' ? 'reserved' : 'available';

  seatStatus[id] = next;
  seatDiv.className = 'seat ' + next;
}

saveBtn.addEventListener('click', () => {
  if (!currentScheduleId) {
    alert('請先選擇場次！');
    return;
  }
  localStorage.setItem('seats_' + currentScheduleId, JSON.stringify(seatStatus));
  alert('座位狀態已儲存！');
});

const totalDisplay = document.getElementById('total');
const ticketType = document.getElementById('ticketType');
const checkoutBtn = document.getElementById('checkout');
const colLabelsContainer = document.querySelector('.col-labels');
const seatRowsContainer = document.querySelector('.seat-rows');
const selectDate = document.getElementById('selectDate');
const selectTime = document.getElementById('selectTime');

const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const colCount = 14;
let selectedSeats = [];

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

const schedules = JSON.parse(localStorage.getItem('schedules')) || [];

// 更新時間選單內容
selectDate.addEventListener('change', () => {
  const selected = selectDate.value;
  selectTime.innerHTML = '<option value="">請選擇</option>';

  schedules
    .map((s, index) => ({ ...s, index }))
    .filter(s => s.date === selected)
    .forEach(s => {
      const movie = movieData[s.title]?.title || s.title;
      const option = document.createElement('option');
      option.value = s.index;
      option.textContent = `（${s.room} 廳）${movie}`;
      selectTime.appendChild(option);
    });

  clearSeats(); // 避免先前選擇殘留
});

// 載入座位圖與狀態統計
selectTime.addEventListener('change', () => {
  const index = selectTime.value;
  if (!index) return;
  const schedule = schedules[index];
  loadSeats(index);
});

function clearSeats() {
  colLabelsContainer.innerHTML = '';
  seatRowsContainer.innerHTML = '';
  document.getElementById("availableCount").textContent = 0;
  document.getElementById("soldCount").textContent = 0;
  document.getElementById("selectedCount").textContent = 0;
  totalDisplay.textContent = "NTD 0";
  selectedSeats = [];
}

// 建立座位圖
function loadSeats(index) {
  clearSeats();
  const seatData = JSON.parse(localStorage.getItem('seats_' + index)) || {};

  // 建立欄位標籤
  const spacer = document.createElement('div');
  spacer.className = 'col-label spacer';
  colLabelsContainer.appendChild(spacer);
  for (let i = 1; i <= colCount; i++) {
    const label = document.createElement('div');
    label.className = 'col-label';
    label.textContent = i;
    colLabelsContainer.appendChild(label);
  }

  let sold = 0;
  let available = 0;

  // 建立每一排座位
  rowLabels.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'seat-row';

    const rowLabel = document.createElement('div');
    rowLabel.className = 'row-label';
    rowLabel.textContent = row;
    rowDiv.appendChild(rowLabel);

    for (let i = 1; i <= colCount; i++) {
      const seatId = row + i;
      const seat = document.createElement('div');
      seat.className = 'seat';
      seat.dataset.id = seatId;

      const status = seatData[seatId] || 'available';
      seat.classList.add(status);

      if (status === 'sold') {
        sold++;
        seat.style.cursor = 'not-allowed';
      } else {
        available++;
        seat.addEventListener('click', () => toggleSeat(seat));
      }

      rowDiv.appendChild(seat);
    }

    seatRowsContainer.appendChild(rowDiv);
  });

  document.getElementById("availableCount").textContent = available;
  document.getElementById("soldCount").textContent = sold;
  document.getElementById("selectedCount").textContent = 0;
}

// 點擊切換選取狀態
function toggleSeat(seatDiv) {
  const seatId = seatDiv.dataset.id;
  const index = selectedSeats.indexOf(seatId);

  if (index >= 0) {
    selectedSeats.splice(index, 1);
    seatDiv.classList.remove('selected');
  } else {
    selectedSeats.push(seatId);
    seatDiv.classList.add('selected');
  }

  updateTotal();
}

// 計算金額與更新計數
function updateTotal() {
  const price = parseInt(ticketType.value);
  totalDisplay.innerText = `NTD ${selectedSeats.length * price}`;
  document.getElementById("selectedCount").textContent = selectedSeats.length;
}

ticketType.addEventListener('change', updateTotal);

checkoutBtn.addEventListener('click', () => {
  if (selectedSeats.length === 0) {
    alert('請選擇座位');
    return;
  }

  const index = selectTime.value;
  const seatKey = 'seats_' + index;
  const seatData = JSON.parse(localStorage.getItem(seatKey)) || {};

  // 將已選擇的座位標記為 sold
  selectedSeats.forEach(seatId => {
    seatData[seatId] = 'sold';
  });

  // 儲存更新後的座位資料
  localStorage.setItem(seatKey, JSON.stringify(seatData));

  alert(`訂票成功！座位：${selectedSeats.join(', ')}\n總金額：${totalDisplay.innerText}`);

  // 清空選取並重新載入座位圖
  selectedSeats.length = 0;
  loadSeats(index);
  updateTotal(); // 更新總金額顯示
});


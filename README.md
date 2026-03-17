# 🎬 MyCinema 電影訂票平台

> 這是「資訊系統實驗」課程期末專題，一個純前端實作的線上電影訂票與後台管理系統。

## 📝 專案簡介
本專案模擬完整的線上影城系統，分為「一般使用者前台」與「管理員後台」兩大區塊。專案著重於 **UI/UX 介面設計**、**RWD 響應式排版**，並運用瀏覽器內建的 **`localStorage`** 來模擬資料庫，實現跨頁面的狀態管理與資料持久化。

## 🛠️ 技術標籤 (Tech Stack)
* **核心語言:** HTML5, CSS3, JavaScript (Vanilla JS)
* **排版技術:** CSS Flexbox, CSS Grid, RWD (Media Queries, `clamp()`)
* **資料儲存:** Browser `localStorage` (模擬 JSON 資料庫)
* **開發工具:** VS Code

## 🗺️ 系統動線與頁面架構 (UI Flow)
本系統具備清晰的路由與權限邏輯。未登入使用者僅能操作前台劃位，管理員登入後方可進入後台進行排片與座位設定。

<div align="center">
  <img width="70%" alt="image" src="https://github.com/user-attachments/assets/4b540926-de6a-4b52-ae2b-7f44e04783e1" />
</div>

## ✨ 核心功能與技術亮點

### 👤 前台功能 (User Interface)
* **即時場次查詢：** 從 localStorage 動態讀取當日排片資料，並依照電影分級自動顯示對應圖示。
* **互動式座位圖：** 以網格 (Grid) 渲染座位表，支援點擊選位，並即時更新「未售、已售、已選」的座位狀態與總金額計算。
* **訂票狀態管理：** 結帳後自動更新座位資料並寫回 localStorage，防止座位重複劃位。

### 👨‍💼 後台功能 (Admin Dashboard)
* **動態時間軸行事曆：** 使用 CSS Grid 搭配 JavaScript，將排片資料轉換為橫向時間軸 (Timeline)，直觀顯示各影廳的電影播放時段與片長。
* **排片與座位設定：** 管理員可新增放映場次，並獨立設定各場次的特定座位狀態（如：保留位、已售出）。

## 📂 專案架構目錄
```text
MyCinema/
│
├── css/                  # 樣式表 (依頁面拆分)
│   ├── style.css         # 全域共用樣式 (包含 RWD 基礎設定)
│   └── index.css, login.css, booking.css...
│
├── js/                   # 邏輯腳本 (依功能拆分)
│   ├── index.js          # 首頁動態效果與分級圖示渲染
│   ├── booking.js        # 訂票流程、座位狀態切換與金額計算
│   ├── admin.js          # 後台時間軸渲染與權限檢查
│   ├── schedule.js       # 新增排片邏輯
│   └── seats.js          # 後台座位狀態設定
│
├── images/               # 圖片資源 (電影海報、分級圖示)
│
├── 電影訂票平台.pdf       # 專題簡報與架構解析 (詳細功能說明)
├── index.html            # 系統首頁入口
├── login.html            # 管理員登入頁
├── booking.html          # 前台訂票頁
├── admin.html            # 後台管理首頁
├── schedule.html         # 排片設定頁
└── seats.html            # 座位設定頁
```

## 🚀 如何在本地端執行 (How to Run)

本專案為純前端網頁，**無須建置任何後端伺服器或資料庫環境**。

1. **下載專案：** 將本專案的所有檔案 Clone 或下載至本地端電腦。
2. **開啟首頁：** 直接使用瀏覽器（推薦 Chrome 或 Edge）雙擊開啟 `index.html` 檔案即可運行。
3. **⚠️ 重要操作提示：**
   * 由於資料儲存於瀏覽器的 `localStorage` 中，**初次使用時前台將沒有任何場次可供訂票**。
   * 請先點擊首頁的「後台管理」進行登入。
     * 👉 **測試帳號：** `user001`
     * 🔑 **測試密碼：** `password`
   * 登入後，請至「排片設定」新增幾筆場次資料，接著再回到前台 `booking.html`，即可體驗完整的訂票流程。

## 📸 系統畫面展示 (Screenshots)

### 🍿 前台：使用者訂票體驗
<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <b>1. 首頁與動態分級顯示</b><br>
      展示熱映電影，使用 <code>clamp()</code> 確保 RWD 效果。
      <br><br>
      <img width="1060" height="1261" alt="image" src="https://github.com/user-attachments/assets/d1f14f8f-a0aa-426b-8a23-bb44ee1a42a1" />
    </td>
    <td width="50%" valign="top">
      <b>2. 互動式劃位系統</b><br>
      點選座位即時變更狀態與計算金額。
      <br><br>
      <img width="1318" height="1228" alt="image" src="https://github.com/user-attachments/assets/fdc99a01-97d9-4d68-b42b-40b2347da14d" />
    </td>
  </tr>
</table>

### ⚙️ 後台：影城排片管理
<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <b>1. 動態時間軸行事曆 (Admin Dashboard)</b><br>
      將 localStorage 排片資料視覺化為色塊，直觀檢視各影廳放映時間與長度。
      <br><br>
      <img width="1636" height="1171" alt="image" src="https://github.com/user-attachments/assets/48fa0eba-b132-4008-b1a8-f3bb5714e7cf" />
    </td>
    <td width="50%" valign="top">
      <b>2. 排片設定 (Schedule)</b><br>
      管理員可在此新增放映場次（指定電影、日期、時間與影廳），並檢視目前排片清單。
      <br><br>
      <img width="1459" height="1203" alt="image" src="https://github.com/user-attachments/assets/05557027-0c0d-4600-91dd-0befd28595ba" />
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center" valign="top">
      <br>
      <b>3. 座位設定 (Seats)</b><br>
      選擇特定場次後，可於 14x8 的網格圖中，獨立設定單一或多個座位的「可售、已售、保留」狀態。
      <br><br>
      <img width="70%" alt="image" src="https://github.com/user-attachments/assets/3a183df0-8c8a-4fa7-a4da-447da04145f4" />
    </td>
  </tr>
</table>

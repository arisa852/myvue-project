# myvue-project

Picko

Vue 3 前端應用｜穿搭靈感 × 美食探索｜讓每天的選擇更輕鬆

一款以 Vue 3 打造的互動式前端應用，結合「穿搭靈感」與「美食探索」兩大主題。
專案聚焦在 元件化、資料流管理、前端邏輯處理與 UI / UX 互動設計，
展示從資料整理 → 邏輯封裝 → UI 呈現的完整前端開發流程。

## 專案特色

1. 使用 Vue 3（Composition API）打造模組化架構

使用 script setup、computed、reactive 管理資料

抽離共用邏輯為 composable（例如：餐廳資料處理 useGetRestaurantList）

透過 props / emits 實現父子雙向溝通

2. 資料流完整：篩選 → 排序 → 分頁 → UI 呈現

可依季節 / 風格 / 類別篩選不同穿搭或餐廳

價格 / 評分排序（asc / desc / none 三段切換）

可分頁顯示（帶 computed 計算當前列表）

選單變動後，所有 UI 可自動同步更新

可重複使用的邏輯封裝（Composable）

## 專案資訊

前端框架：Vue 3 (Composition API, script setup)

打包工具：Vite

樣式管理：SCSS Modules（variables, mixins）

模擬資料來源：JSON Server

版本控制：Git / GitHub

## 專案結構

```
src/
├── assets/ # 靜態資源（圖片、樣式）
│ └── style/ # SCSS 變數與 mixin
├── components/ # 元件（OutfitCard、SideBar、BannerSection）
├── views/ # 頁面（StyleView、FoodView、CollectView）
├── data/ # 模擬 JSON 資料（outfits.json / db.json）
├── router/ # Vue Router 設定
└── main.js # 專案進入點

```

## 環境安裝與使用

Clone 專案

```bash
git clone https://github.com/arisa852/Picko.git
cd Picko
```

### 安裝相依套件

```bash
npm install
```

### 啟動本地資料庫 (json-server)

```bash
npx json-server --watch src/data/db.json --port 3000
```

### 啟動開發伺服器

```bash
npm run dev
```

### 目前已完成功能

##穿搭靈感（Outfit Module）

今日穿搭靈感：隨機抽選今日配色

篩選：季節 / 風格

動態資料載入（JSON Server）

RWD 響應式版面

UI 卡片呈現

##美食模組（Food Module）

餐廳列表 + 卡片呈現

Sort：價格 / 評分（asc / desc / none）

Filter：類別 / 價位 / 地區

Pagination：分頁顯示

Drawer：店家詳情 + Swiper 圖片輪播

開店狀態判斷（自行撰寫邏輯）

### 範例資料(json-server)

```
{
"outfits": [
{
"id": 1,
"name": "黃紅拼色T恤",
"season": "summer",
"style": "casual",
"slot": "top",
"image": "/images/top_1.png"
},
{
"id": 2,
"name": "藍色長褲",
"slot": "bottom",
"style": "casual",
"season": "summer",
"image": "/images/bottom_2.png"
}
]
}

```

### 未來計畫

新增「吃的靈感」模組（食物推薦與篩選邏輯）

導入 Pinia 狀態管理

建立登入 / 註冊頁面（模擬使用者資料）

優化 UI 動畫與互動細節

收藏 / 本地儲存功能整合

### 開發理念

Picko 的初衷是「讓日常選擇變得更輕鬆」。
希望透過隨機抽選與篩選條件結合的設計，
在視覺與互動上提供愉快的探索體驗，
並在未來串接 API 後，成為可推薦穿搭與餐飲靈感的智慧應用。

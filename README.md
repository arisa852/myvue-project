# myvue-project

Picko

Vue 3 前端應用｜穿搭靈感 × 美食探索

Picko 是一個以 Vue 3 開發的前端應用，結合「穿搭靈感」與「美食探索」兩大主題。
目前主要完成穿搭模組，使用者可以透過隨機抽選獲得今日穿搭靈感，
並依照季節或風格篩選不同的服裝組合。

本專案著重於 元件化架構、資料綁定與響應式設計，
以實作方式展示前端開發流程與 UI 整合能力。

## 專案資訊

前端框架：Vue 3 (Composition API, script setup)

打包工具：Vite

樣式管理：SCSS Modules（variables, mixins）

模擬資料來源：JSON Server

版本控制：Git / GitHub

## 專案結構

src/
├── assets/ # 靜態資源（圖片、樣式）
│ └── style/ # SCSS 變數與 mixin
├── components/ # 元件（OutfitCard、SideBar、BannerSection）
├── views/ # 頁面（StyleView、FoodView、CollectView）
├── data/ # 模擬 JSON 資料（outfits.json / db.json）
├── router/ # Vue Router 設定
└── main.js # 專案進入點

## 環境安裝與使用

Clone 專案

git clone https://github.com/arisa852/Picko.git
cd Picko

### 安裝相依套件

npm install

### 啟動本地資料庫 (json-server)

npx json-server --watch src/data/db.json --port 3000

### 啟動開發伺服器

npm run dev

### 目前功能

今日穿搭靈感（隨機抽選服飾組合） ✅

篩選功能（季節 / 風格） ✅

JSON 模擬資料載入 ✅

RWD 響應式設計 ✅

收藏功能 ⏳ 開發中

吃的靈感頁面 🔜 規劃中

登入 / 註冊頁面 🔜 規劃中

### 範例資料(json-server)

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

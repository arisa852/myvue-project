# myvue-project

Picko

Vue 3 前端應用｜穿搭靈感 × 美食探索  
幫助使用者在日常中快速做出「吃什麼、穿什麼」的選擇

## 🔗 Demo

- 線上展示：https://myvue-project-demo.vercel.app

> 此 Demo 為專案 v1 版本，著重於前端架構、資料流處理與 UI / UX 實作，
> 作為後續功能擴充與優化的基礎。

## 專案介紹

Picko 是一款以 Vue 3 打造的互動式前端 SPA，
結合「穿搭靈感」與「美食探索」兩大主題。

專案著重於：

- 元件化設計與頁面拆分
- 前端資料流（篩選 / 排序 / 分頁）
- 可重複使用邏輯的封裝（Composables）
- UI / UX 與 RWD 響應式設計

展示從資料整理 → 邏輯處理 → UI 呈現的完整前端開發流程。

## 專案特色

### Vue 3 + Composition API 架構

- 以 Composition API 撰寫元件（setup / script setup）
- 使用`ref、reactive、computed`管理狀態
- 明確區分 props / emits，維持單向資料流

### 前端資料流設計（Food Module）

- 資料流程：篩選（Filter） → 排序（Sort） → 分頁（Pagination） → UI 呈現
- 條件變動時，餐廳列表會即時同步更新
- 於美食模組中使用 computed 集中處理衍生列表資料，
- 以避免不必要的重複計算並提升資料流可讀性

### 可重用邏輯封裝

- 將資料處理與排序邏輯抽離為 Composables
- UI 與商業邏輯解耦，提升可維護性與可讀性

### UI / UX 與 RWD

- 桌機 / 平板 / 手機響應式版面設計
- 卡片式 UI、Drawer 詳情視窗
- Swiper 圖片輪播增強互動體驗

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

#### 穿搭靈感（Outfit Module）

- 穿搭列表與卡片呈現
- 篩選：季節 / 風格
- 動態資料載入（JSON Server）
- RWD 響應式版面

#### 美食模組（Food Module）

- 餐廳列表與卡片呈現
- Sort：價格 / 評分（asc / desc / none）
- Filter：類別 / 價位 / 地區
- Pagination：分頁顯示
- Drawer：店家詳情視窗
- Swiper：餐廳圖片輪播
- 開店狀態判斷（自行實作邏輯）

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

- 導入 Pinia 管理跨頁狀態
- 建立登入 / 註冊頁（Firebase）
- 收藏功能（LocalStorage / Firebase）
- UI / UX 細節與動畫優化

### 開發理念

Picko 的初衷是「讓日常選擇變得更輕鬆」。
希望透過隨機抽選與篩選條件結合的設計，
在視覺與互動上提供愉快的探索體驗，
並在未來串接 API 後，成為可推薦穿搭與餐飲靈感的智慧應用。

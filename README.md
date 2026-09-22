# Focus / Tabindex 測試頁

一個純 HTML / CSS / JS 的無障礙（a11y）鍵盤操作示範頁，用十個小節依序示範鍵盤焦點管理常見的觀念與陷阱，適合用來自我練習或教學展示。

## 使用方式

不需要建置工具，直接用瀏覽器開啟 [index.html](index.html)，或用任一靜態伺服器啟動：

```bash
npx serve .
```

## 測試方式

請全程**只用鍵盤**操作：

1. 用滑鼠點一下網址列或頁面空白處，讓焦點離開所有按鈕
2. 按 `Tab` 鍵，觀察焦點是否依序移到每一顆元素上（橘色外框）
3. 焦點停在按鈕上時，分別按 `Enter` 和 `空白鍵`，觀察畫面訊息是否有反應

## 內容小節

| # | 主題 | 重點 |
|---|------|------|
| 1 | 原生 `<button>` | 不加任何屬性，完全依賴瀏覽器原生鍵盤行為 |
| 2 | `<div>` 模擬按鈕 | 手動補上 `role="button"`、`tabindex="0"`、`keydown` 事件才能讓行為接近原生按鈕 |
| 3 | `addEventListener` | 不寫 inline `onclick`，改由 JS 註冊事件 |
| 4 | `tabindex="-1"` | 元素不進入 Tab 順序，但可用 `.focus()` 主動聚焦（例如聚焦到剛顯示的訊息面板） |
| 5 | 焦點順序 vs 視覺順序 | Tab 順序永遠跟著 DOM 順序，不能只靠 CSS（如 `row-reverse`）翻轉畫面 |
| 6 | 焦點陷阱（Focus Trap） | 對話框開啟時 Tab 應只在框內循環，關閉後焦點歸還給觸發按鈕 |
| 7 | Roving tabindex | 一組選項中只有目前項目 `tabindex="0"`，其餘為 `-1`，用方向鍵切換 |
| 8 | `aria-live` | 動態更新但焦點不移動的內容，需要 `aria-live="polite"` 讓螢幕報讀器播報 |
| 9 | Skip Link（跳過區塊連結） | 讓鍵盤使用者一鍵跳過重複的導覽選單 |
| 10 | 可及名稱（Accessible Name） | 純圖示按鈕需要 `aria-label` 才能被螢幕報讀器正確唸出 |
| 11 | `<img>` 的 alt 與 aria-label 搭配 | `alt=""` 代表「請忽略我」，跟「功能控制項」的角色不能同時成立，詳見 [docs/img-alt-aria-label.md](docs/img-alt-aria-label.md) |

## 檔案結構

- [index.html](index.html) — 十一個示範小節的頁面結構
- [script.js](script.js) — 各小節的鍵盤事件、焦點管理、roving tabindex、focus trap 邏輯
- [style.css](style.css) — 版面樣式，含 `prefers-color-scheme` 深色模式與 `:focus-visible` 焦點框樣式
- [docs/img-alt-aria-label.md](docs/img-alt-aria-label.md) — `<img>` 的 `alt` 與 `aria-label` 判斷指南（含實際檢測修正案例，已去識別化）

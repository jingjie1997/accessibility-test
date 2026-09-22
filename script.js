function log(type, label) {
  const el = document.getElementById('log-' + type);
  const time = new Date().toLocaleTimeString('zh-TW', { hour12: false });
  el.textContent = `[${time}] 按鈕 ${label} 被觸發了！`;
}

function handleKeydown(event, type, label) {
  // 原生 button 會自動處理 Enter / Space，div／img 模擬按鈕必須自己判斷
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault(); // 避免空白鍵造成頁面捲動
    log(type, label);
  }
}

// 區塊三：不寫 inline onclick，改用 addEventListener 幫每顆按鈕註冊事件
document.querySelectorAll('#btn-listener-a, #btn-listener-b, #btn-listener-c')
  .forEach((btn) => {
    btn.addEventListener('click', () => {
      log('listener', btn.dataset.label);
    });
  });

// 區塊四：tabindex="-1" 示範，點擊按鈕後用 JS 主動把焦點移到對應面板上
const logNegative = document.getElementById('log-negative');

document.querySelectorAll('#btn-show-panel-a, #btn-show-panel-b, #btn-show-panel-c')
  .forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = document.getElementById(btn.dataset.target);
      panel.focus();
      const time = new Date().toLocaleTimeString('zh-TW', { hour12: false });
      logNegative.textContent = `[${time}] 已透過 JS 呼叫 .focus()，焦點移到「${panel.id}」上了`;
    });
  });

// 區塊六：焦點陷阱（Modal 對話框）
const modalOverlay = document.getElementById('modal-overlay');
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('btn-open-modal');
const modalConfirmBtn = document.getElementById('modal-confirm');
const modalCancelBtn = document.getElementById('modal-cancel');
let modalOpener = null;

function openModal() {
  modalOpener = document.activeElement; // 記住是誰打開了對話框
  modalOverlay.hidden = false;
  modal.focus(); // 開啟後把焦點移進對話框
  document.addEventListener('keydown', handleModalKeydown);
}

function closeModal() {
  modalOverlay.hidden = true;
  document.removeEventListener('keydown', handleModalKeydown);
  if (modalOpener) modalOpener.focus(); // 焦點歸還給原本的觸發按鈕
}

function handleModalKeydown(event) {
  if (event.key === 'Escape') {
    closeModal();
    return;
  }
  if (event.key !== 'Tab') return;

  // 把 Tab 焦點限制在對話框內的按鈕之間循環
  const focusables = modal.querySelectorAll('button');
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

openModalBtn.addEventListener('click', openModal);
modalCancelBtn.addEventListener('click', closeModal);
modalConfirmBtn.addEventListener('click', closeModal);

// 區塊七：Roving tabindex
const rovingList = document.getElementById('roving-list');
const rovingItems = Array.from(rovingList.querySelectorAll('[role="option"]'));
const logRoving = document.getElementById('log-roving');
let rovingIndex = 0;

function setRovingIndex(newIndex) {
  rovingItems[rovingIndex].tabIndex = -1;
  rovingItems[rovingIndex].setAttribute('aria-selected', 'false');
  rovingIndex = newIndex;
  rovingItems[rovingIndex].tabIndex = 0;
  rovingItems[rovingIndex].setAttribute('aria-selected', 'true');
  rovingItems[rovingIndex].focus();
  logRoving.textContent = `目前選取：${rovingItems[rovingIndex].dataset.value}（用 ← → 方向鍵切換，Home/End 跳到頭尾）`;
}

rovingList.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    setRovingIndex((rovingIndex + 1) % rovingItems.length);
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    setRovingIndex((rovingIndex - 1 + rovingItems.length) % rovingItems.length);
  } else if (event.key === 'Home') {
    event.preventDefault();
    setRovingIndex(0);
  } else if (event.key === 'End') {
    event.preventDefault();
    setRovingIndex(rovingItems.length - 1);
  }
});

rovingItems.forEach((item, index) => {
  item.addEventListener('click', () => setRovingIndex(index));
});

// 區塊八：aria-live 動態內容播報
const addItemBtn = document.getElementById('btn-add-item');
const logLive = document.getElementById('log-live');
let cartCount = 0;

addItemBtn.addEventListener('click', () => {
  cartCount++;
  logLive.textContent = `購物車：${cartCount} 件商品`;
});

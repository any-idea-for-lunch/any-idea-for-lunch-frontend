// 1. 루트 외곽 카테고리
let rootItems = ["0","1","2","3","4","5","6","7","8"];

// 2. 1단계 세부 메뉴 (카테고리별)
let subItemsMap = {
    "면": ["0","1","2","3","4","5","6","7","8"],
    "밥": ["0","1","2","3","4","5","6","7","8"]
  // 필요시 나머지 카테고리 추가
};

// 3. 2단계 주변 가게 예시
let storeItemsMap = {
    "라면": ["0","1","2","3","4","5","6","7","8"],
    "쌀국수": ["0","1","2","3","4","5","6","7","8"]
  // 필요시 나머지 메뉴 추가
};

let depth = 0;              // 0 = 루트, 1 = 1단계, 2 = 2단계
let selectedValue = null;   // 현재 선택된 값

function renderTiles() {
  const grid = document.getElementById("mandalGrid");
  grid.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");

    // 중앙
    if (i === 4) {
      tile.classList.add("center");
      if (depth === 0) {
        tile.innerHTML = `<span class="main">메뉴 추천</span>`;
      } else {
        tile.innerHTML = `<span class="main">${selectedValue}<br>(클릭해서 되돌아가기)</span>`;
        tile.onclick = goBack;
      }
      grid.appendChild(tile);
      continue;
    }

    // 외곽 타일
    let itemsArray = [];

    if (depth === 0) {
      itemsArray = rootItems;
    } else if (depth === 1) {
      itemsArray = subItemsMap[selectedValue] || Array(8).fill(0).map((_, idx) => `${selectedValue}-${idx}`);
    } else if (depth === 2) {
      itemsArray = storeItemsMap[selectedValue] || Array(8).fill(0).map((_, idx) => `${selectedValue}-${idx}`);
    }

    // index 조정 (i>=4이면 중앙 제외)
    const content = itemsArray[i >= 4 ? i - 1 : i] || `${selectedValue}-${i}`;
    tile.innerHTML = `<span class="main">${content}</span>`;

    if (depth < 2) tile.onclick = () => enterTile(content);
    else tile.onclick = () => {}; // depth2 이상 클릭 비활성

    grid.appendChild(tile);
  }
}

function enterTile(value) {
  if (depth >= 2) return;
  selectedValue = value;
  depth++;
  renderTiles();
}

function goBack() {
  if (depth === 0) return;
  depth--;
  if (depth === 0) selectedValue = null;
  else {
    const parts = selectedValue.split("-");
    parts.pop();
    selectedValue = parts.join("-");
  }
  renderTiles();
}

// 초기 실행
renderTiles();

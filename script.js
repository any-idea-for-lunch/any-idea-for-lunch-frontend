// 1. 루트 대분류
let rootItems = ["밥", "면", "빵/과자", "국/찌개", "고기","1","2","3"];

// 2. 소분류 메뉴
let subItemsMap = {
  "밥": ["볶음밥/오므라이스","카레","덮밥", "0","1","2","3","4"],
  "면": ["국수","라면","스파게티","파스타","우동","냉모밀","0","1"],
  "빵/과자": ["피자","샌드위치","0","1","2","3","4","5"],
  "국/찌개": ["순두부찌개","부대찌개","김치찌개, 된장찌개","국밥","육개장","해장국","0","1"],
  "고기": ["돈까스","불고기/제육볶음","스테이크","갈비찜","삼계탕","수육","치킨","순대"],

  "한식": ["김치찌개","된장찌개","불고기","비빔밥","잡채","삼계탕","갈비찜","제육볶음"],
  "중식": ["짜장면","짬뽕","탕수육","마파두부","양장피","볶음밥","깐풍기","울면"],
  "양식": ["스파게티","리조또","피자","스테이크","파스타","샐러드","라자냐","수프"]
};

// 3. 소분류 메뉴별 주변 가게 예시
let storeItemsMap = {
  "라면": ["라면가게 A","라면가게 B","라면가게 C"],
  "우동": ["우동집 1","우동집 2"],
  // 나머지 메뉴도 필요시 추가 가능
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

    // 소분류 페이지 타일이면 글자 아래 "ㅁ 주변 가게: n곳" 추가
    if (depth === 1) {
      tile.innerHTML = `
        <span class="main">${content}</span>
        <span class="sub-text"><i class="fas fa-house"></i> 주변 가게: n곳</span>
      `;
      tile.onclick = () => showStores(content);
    } else {
      tile.innerHTML = `<span class="main">${content}</span>`;
      tile.onclick = () => enterTile(content);
    }

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

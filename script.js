// 1. 루트 대분류
let rootItems = ["밥", "면", "빵/과자", "국/찌개", "고기", "1", "2", "3"];

// 2. 소분류 메뉴
let subItemsMap = {
  "밥": ["볶음밥/오므라이스","카레","덮밥", "0","1","2","3","4"],
  "면": ["국수","라면","스파게티","파스타","우동","냉모밀","0","1"],
  "빵/과자": ["피자","샌드위치","0","1","2","3","4","5"],
  "국/찌개": ["순두부찌개","부대찌개","김치찌개, 된장찌개","국밥","육개장","해장국","0","1"],
  "고기": ["돈까스","불고기/제육볶음","스테이크","갈비찜","삼계탕","수육","치킨","순대"]
};

// 3. 소분류 메뉴별 주변 가게 데이터
let storeItemsMap = {
  "라면": ["라면가게 A","라면가게 B","라면가게 C"],
  "우동": ["우동집 1","우동집 2"]
};

let depth = 0;              // 0 = 대분류, 1 = 소분류
let selectedValue = null;   // 현재 선택된 대분류

function renderTiles() {
  const grid = document.getElementById("mandalGrid");
  grid.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");

    // 중앙 타일
    if (i === 4) {
      tile.classList.add("center");
      if (depth === 0) {
  tile.innerHTML = `<span class="main">메뉴 추천</span>`;
} else {
  tile.innerHTML = `
    <span class="main">${selectedValue}</span>
    <span class="small-text"><i class="fas fa-arrow-left"></i> 클릭해서 돌아가기</span>
  `;
  tile.onclick = goBack;
}

      grid.appendChild(tile);
      continue;
    }

    // 외곽 타일 내용
    let itemsArray = depth === 0 ? rootItems : subItemsMap[selectedValue] || [];
    const content = itemsArray[i >= 4 ? i - 1 : i] || "";

    // 소분류 페이지일 때만 "주변 가게" 표시
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
  selectedValue = value;
  depth = 1;
  renderTiles();
}

function goBack() {
  const section = document.getElementById("mapStoreSection");

  // 사라지는 애니메이션
  section.classList.remove("show");

  setTimeout(() => {
    section.style.display = "none";
  }); // CSS transition 시간과 동일하게 맞춤

  depth = 0;
  selectedValue = null;
  renderTiles();
}

function showStores(menuName) {
  const section = document.getElementById("mapStoreSection");
  const title = document.getElementById("selectedMenuTitle");
  const list = document.getElementById("storeList");

  title.textContent = `${menuName} 주변 가게`;
  list.innerHTML = "";

  let stores = storeItemsMap[menuName] || ["가게 정보 없음"];
  stores.forEach(store => {
    const li = document.createElement("li");
    li.textContent = store;
    list.appendChild(li);
  });

  // 1) 보이게 만들기
  section.style.display = "block";

  // 2) 애니메이션 재시작 (리플로우 강제)
  section.classList.remove("show");
  void section.offsetWidth;
  section.classList.add("show");

  // 3) ⭐ 애니메이션과 스크롤을 동시에 진행

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


// 초기 렌더링
renderTiles();

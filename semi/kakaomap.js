let title;
let addr;
let lat;
let lng;
let phone;
let bsCode;

// 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
  contentNode = document.createElement("div"), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
  markers = [], // 마커를 담을 배열입니다
  currCategory = ""; // 현재 선택된 카테고리를 가지고 있을 변수입니다

var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(36.5, 127.5), // 지도 초기 중심 좌표 (한국 중앙)
    level: 13, // 지도의 확대 레벨
  };

// 지도 생성
var map = new kakao.maps.Map(mapContainer, mapOption);

/* 지역 선택
var areas = {
        'gyeonggi': {center: new kakao.maps.LatLng(37.4138, 127.5183), level: 11}, // 경기도 중심좌표
        'gangwon': {center: new kakao.maps.LatLng(37.8228, 128.1555), level: 11}, // 강원도 중심좌표
        'chungcheong': {center: new kakao.maps.LatLng(36.6355, 127.4916), level: 11}, // 충청도 중심좌표
        'gyeongsang': {center: new kakao.maps.LatLng(35.5396, 129.3110), level: 11}, // 경상도 중심좌표
        'jeolla': {center: new kakao.maps.LatLng(35.4289, 126.9015), level: 11}, // 전라도 중심좌표
        'jeju': {center: new kakao.maps.LatLng(33.4996, 126.5312), level: 8} // 제주도 중심좌표
    };
    
 function zoomIn(area) {
        var location = areas[area];
        if (location) {	
            map.setCenter(location.center);
            map.setLevel(location.level, {animate: true});
            searchTouristSpots(location.center); // 관광지 검색 호출
        }
    }
*/

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(map);

function searchLocalPlaces() {
  const keyword = document.getElementById("keyword").value;

  ps.keywordSearch(keyword, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const place1 = result[0]; // 검색 결과의 첫 번째 항목 선택
      const latLng = new kakao.maps.LatLng(place1.y, place1.x);

      // 지도 중심을 검색된 위치로 이동하고, 줌 레벨을 조정
      map.setCenter(latLng);
      map.setLevel(8); // 레벨은 1에서 14까지 조정 가능 (작을수록 확대)

      // 검색 결과를 마커로 표시
      new kakao.maps.Marker({
        map: map,
        position: latLng,
      });
    }
  });

  // 지도에 idle 이벤트를 등록합니다
  kakao.maps.event.addListener(map, "idle", searchPlaces);

  // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
  contentNode.className = "placeinfo_wrap";

  // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
  // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
  addEventHandle(contentNode, "mousedown", kakao.maps.event.preventMap);
  addEventHandle(contentNode, "touchstart", kakao.maps.event.preventMap);

  // 커스텀 오버레이 컨텐츠를 설정합니다
  placeOverlay.setContent(contentNode);

  // 각 카테고리에 클릭 이벤트를 등록합니다
  addCategoryClickEvent();

  // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
  function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
      target.addEventListener(type, callback);
    } else {
      target.attachEvent("on" + type, callback);
    }
  }

  // 카테고리 검색을 요청하는 함수입니다
  function searchPlaces() {
    if (!currCategory) {
      return;
    }

    // 커스텀 오버레이를 숨깁니다
    placeOverlay.setMap(null);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
      displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      // 검색결과가 없는경우 해야할 처리
    } else if (status === kakao.maps.services.Status.ERROR) {
      // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리
    }
  }

  // 지도에 마커를 표출하는 함수입니다
  function displayPlaces(places) {
    // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
    // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
    var order = document
      .getElementById(currCategory)
      .getAttribute("data-order");

    for (var i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = addMarker(
        new kakao.maps.LatLng(places[i].y, places[i].x),
        order
      );

      // 마커와 검색결과 항목을 클릭 했을 때
      // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
      (function (marker, place) {
        kakao.maps.event.addListener(marker, "click", function () {
          displayPlaceInfo(place);
        });
      })(marker, places[i]);
    }
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position, order, order2) {
    var imageSrc = "../image/qibla_9989353.png";
    //'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
    (imageSize = new kakao.maps.Size(27, 28)), // 마커 이미지의 크기
      (imgOptions = {
        spriteSize: new kakao.maps.Size(27, 28), // 스프라이트 이미지의 크기
        /*
            spriteSize : new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(46, (order*36)), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
			*/
      }),
      (markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imgOptions
      )),
      (marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      }));

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  }

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
  function displayPlaceInfo(place) {
    console.log(place);

    var content =
      '<div class="placeinfo">' +
      '   <a class="title" href="' +
      place.place_url +
      '" target="_blank" title="' +
      place.place_name +
      '">' +
      place.place_name +
      "</a>";

    if (place.road_address_name) {
      content +=
        '    <span title="' +
        place.road_address_name +
        '">' +
        place.road_address_name +
        "</span>" +
        '  <span class="jibun" title="' +
        place.address_name +
        '">(지번 : ' +
        place.address_name +
        ")</span>";
    } else {
      content +=
        '    <span title="' +
        place.address_name +
        '">' +
        place.address_name +
        "</span>";
    }

    content +=
      '    <span class="tel">' +
      place.phone +
      "</span>" +
      "</div>" +
      '<input type="button" value="추가" id="btn">' +
      '<div class="after"></div>';

    contentNode.innerHTML = content;
    placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
    placeOverlay.setMap(map);

    $("#btn").click(() => {
      title = place.place_name;
      addr = place.address_name;
      lat = place.x;
      lng = place.y;
      phone = place.phone;
      bsCode = localStorage.getItem("bsCode");

      const serviceName = document.querySelector("#serviceName");
      const serviceJibun = document.querySelector("#serviceJibun");
      const servicePhone = document.querySelector("#servicePhone");

      serviceName.innerHTML = "장소 이름 : " + title;
      serviceJibun.innerHTML = "주소 : " + addr;
      servicePhone.innerHTML = "전화번호" + phone;
    });
  }

  // 각 카테고리에 클릭 이벤트를 등록합니다
  $("#ssTest").click(() => {
    $.ajax({
      type: "post",
      url: "/scheduleAdd2",
      data: {
        serviceName: title,
        serviceJibun: addr,
        serviceLat: lat,
        serviceLng: lng,
        servicePhone: phone,
        memo: $("#memo").val(),
        isReservation: $("#isReservation").val(),
        curTime: $("#time").val(),
        bsCode: bsCode,
      },
      success: function () {
        window.location.href = history.back();
      },
    });
  });

  // 각 카테고리에 클릭 이벤트를 등록합니다
  function addCategoryClickEvent() {
    var category = document.getElementById("category"),
      children = category.children;

    for (var i = 0; i < children.length; i++) {
      children[i].onclick = onClickCategory;
    }
  }

  // 카테고리를 클릭했을 때 호출되는 함수입니다
  function onClickCategory() {
    var id = this.id,
      className = this.className;

    placeOverlay.setMap(null);

    if (className === "on") {
      currCategory = "";
      changeCategoryClass();
      removeMarker();
    } else {
      currCategory = id;
      changeCategoryClass(this);
      searchPlaces();
    }
  }

  // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
  function changeCategoryClass(el) {
    var category = document.getElementById("category"),
      children = category.children,
      i;

    for (i = 0; i < children.length; i++) {
      children[i].className = "";
    }

    if (el) {
      el.className = "on";
    }
  }
}

import { useEffect } from "react";

const { kakao } = window;

function KakaoMapCompnent() {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(37.476761, 126.879946), //지도의 중심좌표
      level: 3,
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "500px",
        height: "500px",
      }}
    ></div>
  );
}

export default KakaoMapCompnent;

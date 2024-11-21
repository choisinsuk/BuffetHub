import React, { useEffect } from 'react';
import Modal from 'react-modal'; // 모달 컴포넌트 가져오기

const MapModal = ({ isOpen, onRequestClose }) => {
  // 모달이 열릴 때마다 카카오 지도를 초기화하는 useEffect 훅
  useEffect(() => {
    if (isOpen) {
      // 지도 컨테이너 요소를 가져옴
      const mapContainer = document.getElementById('map');
      
      // 지도 초기 설정
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.4813, 126.8846), // 중심 좌표
        level: 3, // 확대 수준
      };
      
      // 지도 생성
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      
      // 마커 위치 설정
      const markerPosition = new window.kakao.maps.LatLng(37.4813, 126.8846);
      
      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: markerPosition, // 마커 위치 설정
      });
      
      // 마커를 지도에 추가
      marker.setMap(map);
    }
  }, [isOpen]); // isOpen 상태가 변경될 때마다 실행

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <h2>찾아오는 길</h2>
      {/* 지도 컨테이너 */}
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      {/* 닫기 버튼 */}
      <button onClick={onRequestClose}>닫기</button>
    </Modal>
  );
};

export default MapModal; // MapModal 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄

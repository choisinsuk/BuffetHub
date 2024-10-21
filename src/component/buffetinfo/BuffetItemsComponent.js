import React, { useState } from 'react';
import MapModal from './MapModal'; // 모달 컴포넌트 가져오기

const BuffetItems = () => {
  // 모달의 열림/닫힘 상태를 관리하는 상태 변수
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달을 열기 위한 함수
  const openMapModal = () => {
    setIsModalOpen(true);
  };

  // 모달을 닫기 위한 함수
  const closeMapModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ fontSize: '15px' }}>
      {/* 뷔페 정보 항목들 */}
      <div>- 뷔페 식장 소개 -</div>
      <div>
        - 찾아오는 길{' '}
        {/* 지도 보기 버튼 클릭 시 모달을 열도록 설정 */}
        <button onClick={openMapModal} style={{ marginLeft: '5px' }}>
          (지도 보기)
        </button>
      </div>
      <div>- 뷔페허브 소개하는 내용 -</div>
      <div>- 뷔페허브 메뉴 안내 -</div>
      <div>- 메인 디쉬 (대표 메인 디쉬 사진 2~3장, 모든 메인디쉬 종류 나열) -</div>
      <div>- 사이드 디쉬 (대표 사이드 디쉬 사진 2~3장, 모든 사이드 디쉬 종류 나열) -</div>
      <div>- 디저트 (대표 디저트 사진 1~2장, 모든 디저트 종류 나열) -</div>

      {/* 모달 창을 표시, isOpen prop으로 상태 전달 */}
      <MapModal isOpen={isModalOpen} onRequestClose={closeMapModal} />
    </div>
  );
};

export default BuffetItems; // BuffetItems 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄

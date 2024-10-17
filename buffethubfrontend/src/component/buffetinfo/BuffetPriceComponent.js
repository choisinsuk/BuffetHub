const BuffetPrice = () => {
  return (
    <div style={{ fontSize: '15px' }}> {/* 글씨 크기를 설정 */}
      <hr style={{ margin: '1rem 0', border: '1px solid #ccc' }} /> {/* 구분선 추가 */}
      <div>- 이용 가격 및 시간 -</div> {/* 이용 가격 및 시간 제목 */}
      <div>- 평일 27,400원 -</div> {/* 평일 가격 */}
      <div>- 주말, 공휴일 30,000원 -</div> {/* 주말 및 공휴일 가격 */}
      <div>- 초등학생 평일 15,900원 (8세 ~ 13세) -</div> {/* 초등학생 평일 가격 */}
      <div>- 미취학 아동 8,000원 (5세 ~ 7세) -</div> {/* 미취학 아동 가격 */}
      <div>- 운영시간 (11시 ~ 21시) -</div> {/* 운영 시간 */}
    </div>
  );
};

export default BuffetPrice; // BuffetPrice 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄

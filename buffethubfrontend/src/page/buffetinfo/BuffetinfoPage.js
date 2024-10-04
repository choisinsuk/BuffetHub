import BasicLayout from "../../layouts/BasicLayout"; 

const Buffetinfo = () => {
  return (
    <BasicLayout>
      <div className="flex flex-col items-center">
        <div className="text-4xl text-center mb-6">
          
                      Buffet Info
        </div>
        
        <div className="mt-10 text-center">
          <div style={{ fontSize: '15px' }}>
            <div>- 뷔페 식장 소개 -</div>
            <div>- 찾아오는 길 (API를 활용한 지도) -</div>
            <div>- 뷔페허브 소개하는 내용 -</div>
            <div>- 뷔페허브 메뉴 안내 -</div>
            <div>- 메인 디쉬 (대표 메인 디쉬 사진 2~3장, 모든 메인디쉬 종류 나열) -</div>
            <div>- 사이드 디쉬 (대표 사이드 디쉬 사진 2~3장, 모든 사이드 디쉬 종류 나열) -</div>
            <div>- 디저트 (대표 디저트 사진 1~2장, 모든 디저트 종류 나열) -</div>
            <div>- 이용 가격 및 시간 -</div>
            <div>- 평일 27,400원 -</div>
            <div>- 주말, 공휴일 30,000원 -</div>
            <div>- 초등학생 평일 15,900원 (8세 ~ 13세) -</div>
            <div>- 미취학 아동 8,000원 (5세 ~ 7세) -</div>
            <div>- 운영시간 (11시 ~ 21시) -</div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Buffetinfo;

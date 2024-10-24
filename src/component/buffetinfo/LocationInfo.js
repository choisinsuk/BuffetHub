import KakaoMapComponent from "../../component/buffetinfo/KakaoMapComponent";

const LocationInfo = () => {
  return (
    <div className="w-5/6 flex justify-center px-1">
      <table className="w-full py-10 text-center">
        <thead>
          <tr>
            <td colSpan={4} style={{ fontSize: '36px', fontWeight: 'bold', paddingBottom: '50px' }}>
              뷔페 오시는 길
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="flex justify-center items-center">
              <KakaoMapComponent />
            </td>
            <td style={{ paddingBottom: '40px', paddingLeft: '80px', paddingRight: '80px', border: '1px solid black', textAlign: 'left' }}>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', paddingBottom: '16px', paddingTop: '32px' }}>주소</p>
              <div style={{ fontSize: '18px', paddingBottom: '24px' }}>
                <p style={{ paddingBottom: '8px' }}>서울특별시 금천구 가산디지털2로 101</p>
                <p>한라원앤원타워3층</p>
              </div>
              <hr style={{ border: '1px solid black' }} />
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', paddingBottom: '16px', paddingTop: '8px' }}>오시는 길</p>
              <p style={{ fontSize: '24px', paddingBottom: '8px', color: '#ef4444', fontWeight: 'bold' }}>지하철</p>
              <p style={{ fontSize: '24px', paddingBottom: '24px' }}>
                가산디지털단지역 [1호선][7호선]
                <br />
                8번출구 도보 10분
              </p>
              <p style={{ fontSize: '24px', paddingBottom: '8px', color: '#ef4444', fontWeight: 'bold' }}>버스</p>
              <p style={{ fontSize: '24px' }}>
                디지털3단지 월드벤쳐센터 정류장
                <br />
                21, 571, 652, 금천05번 버스 이용
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LocationInfo;

import KakaoMapComponent from "../../component/buffetinfo/KakaoMapComponent";

const LocationInfo = () => {
  return (
    <div className="w-5/6 flex justify-center px-1">
    <table className="w-full py-10 text-center ">
      <thead>
        <tr>
          <td colSpan={4} className="text-4xl font-bold pb-20">
            뷔페 오시는 길
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="flex justify-center items-center">
            <KakaoMapComponent />
          </td>
          <td className="pb-10 text-left px-20 border border-black">
              <p className="text-2xl font-bold text-blue-500 pb-4 pt-8">주소</p>
              <div className="text-xl pb-6">
                <p className="pb-2">서울특별시 금천구 가산디지털2로 101</p>
                <p>한라원앤원타워3층</p>
            </div>
            <hr className="border border-black "/>
            <p className="text-2xl font-bold text-blue-500 pt-2 pb-4">오시는 길</p>
            <p className="text-2xl pb-2 text-red-500 font-bold ">지하철</p>
            <p className="text-2xl pb-6">
              가산디지털단지역 [1호선][7호선]
              <br />
              8번출구 도보 10분
            </p>
            <p className="text-2xl pb-2 text-red-500 font-bold ">버스</p>
            <p className="text-2xl">
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

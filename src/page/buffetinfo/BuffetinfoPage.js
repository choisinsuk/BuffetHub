import KakaoMapCompnent from "../../component/buffetinfo/KakaoMapComponent";
import BasicLayout from "../../layouts/MainLayout"; // 기본 레이아웃 컴포넌트 가져오기
import React, { useEffect, useState } from "react";
import axios from "axios";

// Buffetinfo: 뷔페 정보를 표시하는 컴포넌트
const Buffetinfo = () => {
  const [loading, setLoading] = useState(true);
  const [priceTable, setPriceTable] = useState({
    dayAdultPrice: 0,
    dayChildPrice: 0,
    dayKidsPrice: 0,
    weekAdultPrice: 0,
    weekChildPrice: 0,
    weekKidsPrice: 0,
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/prices"
        );
        setPriceTable(response.data);
      } catch (error) {
        console.error("가격 정보를 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  return (
    <BasicLayout>
      {/* 기본 레이아웃으로 감싸기 */}
      <div className="flex flex-col items-center pb-10">
        {/* 세로로 정렬된 컨테이너 */}
        <div className="bg-white my-5 w-full flex-col space-y-4">
          <main className="bg-orange-100 w-5/6 mx-auto px-3 py-20 rounded-lg flex items-center justify-center text-center shadow-lg border-2-black ">
            <div className="text-5xl text-fontColor font-bold ">뷔페 정보</div>
          </main>
        </div>

        <div className="py-10 w-5/6">
          <div className="py-10  bg-orange-50 border-2 border-orange-50 rounded-lg shadow-xl">
            <table className="w-full text-center py-10">
              <thead>
                <tr>
                  <td colSpan={4} className=" text-4xl font-bold pb-14">
                    뷔페 오시는 길
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="flex justify-center items-center">
                    <KakaoMapCompnent />
                  </td>

                  <td className="pb-10 text-left px-20">
                    <p className="text-2xl font-bold text-blue-500">주소</p>
                    <br />
                    <p className="text-2xl">
                      서울특별시 금천구 가산디지털2로 101
                      <br />
                      한라원앤원타워3층
                    </p>
                    <br />
                    <br />
                    <p className="text-2xl font-bold text-blue-500">
                      오시는 길
                    </p>
                    <br />
                    <p className="text-2xl pb-2 text-red-500 font-bold">
                      지하철
                    </p>
                    <p className="text-2xl">
                      가산디지털단지역 [1호선][7호선]
                      <br />
                      8번출구 도보 10분
                    </p>
                    <br />
                    <p className="text-2xl pb-2 text-red-500 font-bold">버스</p>
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
        </div>
        <div></div>

        <div className="flex justify-center items-center py-10 w-5/6 bg-orange-50 border-2 border-orange-50 rounded-lg shadow-xl px-10">
          <div className="flex text-center justify-center w-3/5 outline-double">
            <table className="text-fontColor w-full border-black min-h-[800px] border-1 outline-double shadow-xl">
              <thead>
                <tr>
                  <th className="py-7 px-1 text-3xl bg-orange-100" colSpan={3}>
                    {" "}
                    {/* 상하 패딩 추가 */}
                    <p className="pt-8">buffet</p>
                    <p>Hub</p>
                    <br />
                    <p className="pb-8">가격표</p>
                  </th>
                </tr>
                <tr>
                  <th className="py-10 pr-20 text-2xl">
                    {" "}
                    {/* 상하 패딩 추가 */}
                    항목
                  </th>
                  <th className="py-10 text-2xl">
                    {" "}
                    {/* 상하 패딩 추가 */}
                    평일
                  </th>
                  <th className="py-10 text-2xl">
                    {" "}
                    {/* 상하 패딩 추가 */}
                    주말
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-10 pr-20 text-lg">
                    {" "}
                    {/* 상하 패딩 추가 */}
                    일반
                    <br />
                    (13세~)
                  </td>
                  <td className="py-10 text-2xl">
                    {" "}
                    {/* 상하 패딩 추가 */}
                    {priceTable.dayAdultPrice}원
                  </td>
                  <td className="py-10 text-2xl">
                    {" "}
                    {/* 상하 패딩 추가 */}
                    {priceTable.weekAdultPrice}원
                  </td>
                </tr>
                <tr>
                  <td className="py-10 pr-20 text-lg">
                    {" "}
                    {/* 상하 패딩 추가 */}
                    아동
                    <br />
                    (8세~13세)
                  </td>
                  <td className="py-10 text-2xl">
                    {" "}
                    {/* 상하 패딩 추가 */}
                    {priceTable.dayChildPrice}원
                  </td>
                  <td className="py-10 text-2xl">
                    {" "}
                    {/* 상하 패딩 추가 */}
                    {priceTable.weekChildPrice}원
                  </td>
                </tr>
                <tr>
                  <td className="py-10 pr-20 text-lg">
                    {" "}
                    {/* 상하 패딩 추가 */}
                    미취학아동
                    <br />
                    (3~8세)
                  </td>
                  <td className="py-10 text-2xl">
                    {" "}
                    {/* 상하 패딩 추가 */}
                    {priceTable.dayKidsPrice}원
                  </td>
                  <td className="py-10 text-2xl">
                    {" "}
                    {/* 상하 패딩 추가 */}
                    {priceTable.weekKidsPrice}원
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="text-center">
                  <td className="py-20"></td>
                </tr>
              </tfoot>

            </table>
          </div>
        </div>

        <div>

        </div>


        <div className="mt-10 text-center">
          <div style={{ fontSize: "15px" }}>
            {/* 뷔페 정보 항목들 */}
            <div>- 뷔페 식장 소개 -</div>
            <div>- 뷔페허브 소개하는 내용 -</div>
            <div>- 뷔페허브 메뉴 안내 -</div>
            <div>
              - 메인 디쉬 (대표 메인 디쉬 사진 2~3장, 모든 메인디쉬 종류 나열) -
            </div>
            <div>
              - 사이드 디쉬 (대표 사이드 디쉬 사진 2~3장, 모든 사이드 디쉬 종류
              나열) -
            </div>
            <div>
              - 디저트 (대표 디저트 사진 1~2장, 모든 디저트 종류 나열) -
            </div>
            {/*db연동 */}
            <hr style={{ margin: "1rem 0", border: "1px solid #ccc" }} />
            {/* 라인 추가 */}
            <div>- 이용 가격 및 시간 -</div>
            <div>- 평일 27,400원 -</div>
            <div>- 주말, 공휴일 30,000원 -</div>
            <div>- 초등학생 평일 15,900원 (8세 ~ 13세) -</div>
            <div>- 미취학 아동 8,000원 (5세 ~ 7세) -</div>
            <div>- 운영시간 (11시 ~ 21시) -</div>
            {/*db연동*/}
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Buffetinfo; // Buffetinfo 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄

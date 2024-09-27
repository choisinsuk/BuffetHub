import React, { useState } from 'react';
import BasicMenu from "../components/menu/BasicMenu";

const BuffetInfoLayout = () => {
  return (
    <div>
      <BasicMenu />
      <MyPage />
    </div>
  );
};

// //가격 설정
// const priceTable = () =>
// {
//   const [daysPrice, setdaysPrice] = useStatus({
//     adult : "27,500원",
//     elementary : "15,900원",
//     kids : "8,000원"
//   });

//   const [weekendPrice, setWeekendPrice] = useStatus({
//     adult : "27,500원",
//     elementary : "15,900원",
//     kids : "8,000원"
//   });
// }


const PriceTable = () => {
  return (
    //테이블 시작
    <main className="bg-red-200 w-full px-5 py-60 text-center">
    <table border="1" style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>항목</th>
          <th>어른</th>
          <th>초등학생</th>
          <th>미취학</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>평일 가격</td>
          <td>20,000원</td>
          <td>15,000원</td>
          <td>10,000원</td>
        </tr>
        <tr>
          <td>주말 가격</td>
          <td>25,000원</td>
          <td>18,000원</td>
          <td>12,000원</td>
        </tr>
      </tbody>
    </table>
    </main>
  );
};

const MenuTable = () => {
  return (
    <main className="bg-sky-200 w-full px-5 py-60 text-center">
          <div className="text-3xl">메뉴설정 들어갈 자리</div>
        </main>
  );
};

const MyPage = () => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="p-5">

     <div className="bg-white my-5 w-full flex-row space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        {/*main태그는 메인 콘텐츠 영역을 저의하며, 배경색과 패딩을 설정한다.*/}
        <main className="bg-sky-200 w-full px-5 py-20 text-center">
        <div className="text-3xl">예약 정보 관리</div>
        </main>
      </div>

      <div className="space-x-4 mb-4 text-center">
        <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => setActiveTab('price')} >
          가격 변경
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded"  onClick={() => setActiveTab('menu')} >
          메뉴 설정
        </button>
      </div>

      <hr className="my-4" />

      {/* 버튼에 따른 콘텐츠 렌더링 */}
      {activeTab === 'price' && <PriceTable />}
      {activeTab === 'menu' && <MenuTable />}
    </div>
  );
};

export default BuffetInfoLayout;

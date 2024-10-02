import React, { useState } from "react";
import BasicMenu from "../components/menu/BasicMenu";
import PriceTable from "../layouts/infoparts/pricetable";
import MenuTable from "../layouts/infoparts/menutable";

const BuffetInfoLayout = () => {
  return (
    <div className  >
      <BasicMenu />
      <MyPage />
    </div>
  );
};

const MyPage = () => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="p-5">
      <div className="bg-white my-5 w-full flex-row space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        {/* main 태그는 메인 콘텐츠 영역을 저의하며, 배경색과 패딩을 설정한다. */}
        <main className="bg-customColor2 w-full px-3 py-20 rounded-lg flex items-center justify-center">
          <div className="text-3xl font-bold text-white">예약 정보 관리</div>
        </main>
      </div>

      <hr className="my-4" />

      <div className="space-x-4 mb-4 text-center">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={() => setActiveTab("price")}
        >
          가격 변경
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => setActiveTab("menu")}
        >
          메뉴 설정
        </button>
      </div>

      <hr className="my-4" />

      {/* 버튼에 따른 콘텐츠 렌더링 */}
      {activeTab === "price" && <PriceTable />}
      {activeTab === "menu" && <MenuTable />}
    </div>
  );
};

export default BuffetInfoLayout;

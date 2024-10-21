import React, { useState } from "react";
import BasicMenu from "../components/menu/BasicMenu";
import PriceTable from "./components/buffetinfo/pricetable";
import MenuTable from "./components/buffetinfo/menutable";

const BuffetInfo = () => {
  const [activeTab, setActiveTab] = useState('price');
  
  return (
    <div>
      <BasicMenu />
    
      <div className="bg-white my-5 w-full flex-col space-y-4">
        <main className="bg-customColor2 w-5/6 mx-auto px-3 py-20 rounded-lg flex items-center justify-center text-center shadow-lg border-2-black ">
          <div className="text-5xl text-fontColor font-bold ">뷔페 정보 관리</div>
        </main>
      </div>

      <div className="space-x-4 text-center">
        <button
          className="bg-customColor3 text-fontColor py-5 px-10 rounded shadow-lg transition transform hover:scale-110 duration-200 ease-in-out text-2xl hover:bg-customColor2 font-bold"
          onClick={() => setActiveTab("price")}>
          가격 변경
        </button>

        <button
         className="bg-customColor3 text-fontColor py-5 px-10 rounded shadow-lg transition transform hover:scale-110 duration-200 ease-in-out text-2xl hover:bg-customColor2 font-bold"
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


export default BuffetInfo;

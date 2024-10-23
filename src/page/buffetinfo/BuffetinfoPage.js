import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicLayout from "../../layouts/MainLayout";
import Menus from "../../component/buffetinfo/menutable"; // 대문자로 시작하는 컴포넌트 이름 확인
import LocationInfo from "../../component/buffetinfo/LocationInfo";
import PriceTable from "../../component/buffetinfo/PriceTable";
import Header from "../../component/buffetinfo/Header";

const Buffetinfo = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('LocationInfo');
  const [priceTable, setPriceTable] = useState({
    dayAdultPrice: 0,
    dayChildPrice: 0,
    dayKidsPrice: 0,
    weekAdultPrice: 0,
    weekChildPrice: 0,
    weekKidsPrice: 0,
  });
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const axiosInstance = axios.create({
      baseURL: "http://localhost:8080/api/admin/",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const fetchPrices = async () => {
      try {
        const response = await axiosInstance.get("prices");
        setPriceTable(response.data);
      } catch (error) {
        console.error("가격 정보를 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMenus = async () => {
      try {
        const response = await axiosInstance.get("menus");
        setMenus(response.data);
      } catch (error) {
        console.error("메뉴 정보를 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchPrices();
    fetchMenus();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <BasicLayout>
    
      <div className="flex flex-col items-center justify-center pb-10 pt-10">
        <Header />
      </div>

      <div className="space-x-4 text-center pb-10">
        <button
          className="bg-orange-100 text-fontColor py-5 px-10 rounded shadow-lg transition transform hover:scale-110 duration-200 ease-in-out text-2xl hover:bg-customColor2 font-bold"
          onClick={() => setActiveTab("LocationInfo")}
        >
          매장 위치
        </button>

        <button
          className="bg-orange-100 text-fontColor py-5 px-10 rounded shadow-lg transition transform hover:scale-110 duration-200 ease-in-out text-2xl hover:bg-customColor2 font-bold"
          onClick={() => setActiveTab("PriceTable")}
        >
          이용 가격
        </button>

        <button
          className="bg-orange-100 text-fontColor py-5 px-10 rounded shadow-lg transition transform hover:scale-110 duration-200 ease-in-out text-2xl hover:bg-customColor2 font-bold"
          onClick={() => setActiveTab("Menus")}
        >
          메뉴 정보
        </button>
      </div>

      <div className="w-full flex justify-center pb-20">
        {activeTab === "LocationInfo" && <LocationInfo />}
        {activeTab === "PriceTable" && <PriceTable priceTable={priceTable} />}
        {activeTab === "Menus" && <Menus menus={menus} />} {/* 필요한 props 전달 */}
      </div>
    </BasicLayout>
  );
};

export default Buffetinfo;

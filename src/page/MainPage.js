import BasicLayout from "../layouts/MainLayout";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import BuffetPicture from "../images/buffet.png";
import fruit from "../images/과일뷔페.jpg";
import drinkbar from "../images/드링크바.jpg";
import dessert from "../images/디저트.png";
import sushi from "../images/초밥.png";
import hotdish from "../images/핫디쉬.png";
import axios from "axios"; // axios 가져오기

const MenuSlider = ({ menus }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div className="px-1">
      <Slider {...settings}>
        {menus.map((menu, index) => (
          <div key={index} className="flex justify-center px-3 py-3">
            <div className="flex flex-col items-center bg-orange-100 border border-gray-300 rounded-lg p-6 text-center shadow-md transition transform hover:scale-105 duration-200 ease-in-out">
              <img
                src={menu.imageUrl}
                alt={menu.name}
                className="w-50 h-50 object-cover"
              />
              <h3 className="mt-2 text-3xl font-bold">{menu.name}</h3>
              <p>{menu.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const MainPage = () => {
  const [menus, setMenus] = useState([]);
  const [notices, setNotices] = useState([]); // 공지사항 상태 초기화
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // JWT 토큰 가져오기

    console.log("토큰:", token);
    // API 기본 설정
    const axiosInstance = axios.create({
      baseURL: "http://localhost:8080/api/admin/",
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰 추가
        "Content-Type": "application/json",
      },
    });

    const fetchMenus = () => {
      const tempMenus = [
        {
          name: "초밥",
          description: "신선한 해산물로 만든 초밥",
          imageUrl: sushi,
        },
        {
          name: "핫 디쉬",
          description: "뜨끈한 요리로 맛을 더해요",
          imageUrl: hotdish,
        },
        {
          name: "디저트",
          description: "달콤한 마무리, 다양한 디저트",
          imageUrl: dessert,
        },
        {
          name: "각종 과일",
          description: "신선한 과일로 상큼함을!",
          imageUrl: fruit,
        },
        {
          name: "드링크 바",
          description: "다양한 음료로 갈증 해소!",
          imageUrl: drinkbar,
        },
      ];
      setMenus(tempMenus);
    };

    const fetchNotices = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8080/api/admin/noticeBoard/list"
        );
        setNotices(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
        setError("공지사항을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
    fetchNotices();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중 메시지
  }

  return (
    <BasicLayout>
      <div
        className="text-4xl text-center"
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* scrollbarWidth: 'none'은 Firefox에만 적용됩니다. */}
        <style jsx>{`
          /* Chrome, Safari, and Opera */
          Q .text-4xl::-webkit-scrollbar {
            display: none; /* Chrome, Safari, and Opera */
          }
        `}</style>

        <div className="mt-10">
          <img
            src={BuffetPicture}
            alt="topimage"
            className="w-full mx-auto opacity-80"
          />
          <div className="mt-2" style={{ fontSize: "20px" }}>
            {menus.length > 0 && <MenuSlider menus={menus} />}
          </div>

          <div className="mt-2 py-4" style={{ fontSize: "20px" }}>
            {error && <div className="text-red-500">{error}</div>}{" "}
            {/* 에러 메시지 표시 */}
            <table className="w-full bg-white border-collapse text-center mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border-b">공지사항 번호</th>
                  <th className="py-2 px-4 border-b">공지사항 제목</th>
                  <th className="py-2 px-4 border-b">입력 날짜</th>
                </tr>
              </thead>
              <tbody>
                {notices.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-2">
                      등록된 공지사항이 없습니다.
                    </td>
                  </tr>
                ) : (
                  notices.slice(0, 5).map(
                    (
                      notice,
                      index // 공지사항을 최대 5개만 표시
                    ) => (
                      <tr
                        key={notice.ntNb}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="py-2 px-4 border-b">{notice.ntNb}</td>
                        <td className="py-2 px-4 border-b">{notice.ntTitle}</td>
                        <td className="py-2 px-4 border-b">{notice.ntRegdt}</td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-2" style={{ fontSize: "20px" }}>
            (추천 이벤트)
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default MainPage;

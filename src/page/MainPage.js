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

const MenuSlider = ({ menus }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="px-1">
      <Slider {...settings}>
        {menus.map((menu, index) => (
          <div key={index} className="flex justify-center px-3 py-3">
            <div className="flex flex-col items-center bg-orange-100 border border-gray-300 rounded-lg p-6 text-center shadow-md transition transform hover:scale-105 duration-200 ease-in-out ">
              <img
                src={menu.imageUrl}
                alt={menu.name}
                className="w-50 h-50 object-cover" // 이미지 크기 조정
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

  useEffect(() => {
    const tempMenus = [
      {
        name: "초밥",
        description: "연어, 참치, 광어, 새우 등",
        imageUrl: sushi,
      },
      {
        name: "핫 디쉬",
        description: "파스타, 피자, 치킨, BBQ 등",
        imageUrl: hotdish,
      },
      {
        name: "디저트",
        description: "케이크, 푸딩, 브레드 등",
        imageUrl: dessert,
      },
      {
        name: "각종 과일",
        description: "복숭아, 오렌지, 사과, 리치, 메론 등",
        imageUrl: fruit,
      },
      {
        name: "드링크 바",
        description: "차, 탄산음료, 커피, 과일주스",
        imageUrl: drinkbar,
      },
    ];

    // 메뉴 데이터를 설정
    setMenus(tempMenus);
  }, []);

  return (
    <BasicLayout>
      <div className="text-4xl text-center">
        <div className="mt-10">
          <img src={BuffetPicture} alt="topimage" className="w-full" />
          <div className="mt-2" style={{ fontSize: "20px" }}>
            {menus.length > 0 && <MenuSlider menus={menus} />}
          </div>
          <div className="mt-2" style={{ fontSize: "20px" }}>
            (공지사항)
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

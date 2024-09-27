import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 적용

function ReservationCalendar() {
  const [date, setDate] = useState(new Date());

  const formatDate = (date) => {
  //연도 추출
  const year = date.getFullYear();
  //월 추출 ( 0부터 시작하므로 +1 필요, 두 자릿수로 맞추기 )
  const month = String(date.getMonth() + 1).padStart(2,'0');
  //일 추출, 두 자릿수로 맞추기
  const day = String(date.getDate()).padStart();
  //요일 추출
  const weekday = date.toLocaleDateString('ko-KR',{weekday:'long'});

  return `${year}년 ${month}월 ${day}일 ${weekday}`;
}

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div className="flex flex-col items-center justify-center h-100 text-center">
      <Calendar onChange={handleDateChange} value={date} />
      <p className="mt-4 font-bold ">선택된 날짜: {formatDate(date)}</p>
      &nbsp;
    </div>
  );
}

export default ReservationCalendar;

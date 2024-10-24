import React, { useState, useEffect } from "react";
import { putVisitStatus } from "../../api/reserveApi"; // API 호출 함수

const VisitStatusToggle = ({ rsNb, initialVisitStatus }) => {
  const [visitStatus, setVisitStatus] = useState(initialVisitStatus); // 방문 상태

  // useEffect를 통해 초기 상태 설정
  useEffect(() => {
    setVisitStatus(initialVisitStatus);
  }, [initialVisitStatus]);

  const handleToggleVisitStatus = async () => {
    try {
      await putVisitStatus(rsNb); // API 호출
      // 방문 상태를 변경
      setVisitStatus(prevStatus => !prevStatus);
    } catch (error) {
      console.error("Error updating visit status", error);
    }
  };

  return (
    <div>
      <h3>예약 번호: {rsNb}</h3>
      <h4>현재 방문 여부: {visitStatus ? "방문" : "미방문"}</h4>
      <button onClick={handleToggleVisitStatus}>
        {visitStatus ? "방문으로 변경" : "미방문으로 변경"}
      </button>
    </div>
  );
};

export default VisitStatusToggle;

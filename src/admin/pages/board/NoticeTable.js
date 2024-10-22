// NoticeTable.js
import React from "react";

const NoticeTable = ({ notices, error }) => {
  return (
    <div className="bg-red-200 w-full text-center p-4 rounded">
      <h2 className="text-xl font-bold mb-4">공지사항 리스트</h2>
      {error && <div className="text-red-500">{error}</div>}
      <table className="w-full bg-white border-collapse text-center">
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
              <td colSpan={3} className="py-2">등록된 공지사항이 없습니다.</td>
            </tr>
          ) : (
            notices.map((notice, index) => (
              <tr key={notice.ntNb} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 px-4 border-b">{notice.ntNb}</td>
                <td className="py-2 px-4 border-b">{notice.ntTitle}</td>
                <td className="py-2 px-4 border-b">{notice.ntRegdt}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NoticeTable;
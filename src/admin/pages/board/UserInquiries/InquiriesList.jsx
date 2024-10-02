import React from 'react';

const InquiriesList = () => {
  return (
    <table className="mt-8 mx-auto border border-gray-500 p-1 w-full max-w-4xl text-center">
      <thead className="text-xl">         
        <tr>
          <th className="border border-gray-400 p-2">문의 번호</th>
          <th className="border border-gray-400 p-2">문의 제목</th>
          <th className="border border-gray-400 p-2">글쓴이</th>
          <th className="border border-gray-400 p-2">입력날짜</th>
        </tr>
      </thead>
      <tbody className="text-xl">
        {[...Array(6)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            <td className="border border-gray-400 p-5"></td>
            <td className="border border-gray-400 p-5"></td>
            <td className="border border-gray-400 p-5"></td>
            <td className="border border-gray-400 p-5"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InquiriesList;

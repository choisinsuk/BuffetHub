const ReserveComponent = () => {
  return (
    <>
      <div className="text-xl font-normal text-center p-4">
        이용시간: 예약시간으로부터 2시간
        <div>위치: 가산동</div>
         <div>전화번호: 02-1234-5678</div>
      </div>
      <div className="text-xl font-normal border border-black p-4 ">
        예약 안내사항(세부)
        <div className="text-xl font-normal border border-black p-4 m-5 mt-10">예약 안내사항 내용</div>
      </div>
      
    </>
  );
};

export default ReserveComponent;

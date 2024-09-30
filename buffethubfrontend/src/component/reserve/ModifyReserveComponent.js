const ModifyReserveComponent = () => {
  return (
    <div className="border border-black">
    <div className="p-2">
      <div className="flex flex-row text-sm m-2 ">
        <div className="p-3 pr-0">예약자 성함</div>
        <input type="text" size={10} className="m-3"></input>
        <div>현장 예약확인 시, 성함과 <br/>
        핸드폰 번호 뒤 4자리가 필요합니다.</div>
      </div>
      <div className="flex flex-row text-sm">
        <div className="p-3 pr-0 ml-2">핸드폰 번호</div>
        <input type="text" size={11} className="m-3" ></input>
        <div className="m-2">- 제외 11자 입력</div>
      </div>
      </div>

      <div className="flex flex-row text-sm m-3 ">
        <div className="flex flex-col m-4">
          <div>성인</div>
          <input type="text" size={3} className="m-4 text-center" defaultValue={1}></input>
        </div>
        <div className="flex flex-col m-4">
          <div>아동</div>
          <input type="text" size={3} className="m-4 text-center" defaultValue={0}></input>
        </div>
        <div className="flex flex-col m-4">
          <div>미취학</div>
          <input type="text" size={3} className="m-4 text-center" defaultValue={0}></input>
        </div>
        <div className="m-6">1-20인까지<br/>
        정수만 입력 가능
        </div>
      </div>

      <div className="m-5 border border-black min-w-[300px] md:min-w-[400px] min-h-[300px]">
        달력
      </div>

      <div className="text-sm flex justify-center border border-black w-3/4 m-auto pb-5">예약일 확인 부분</div>
      
      <div className="text-sm flex flex-row mt-5">
        <div className="mr-3 ml-3">특이사항</div>
        <textarea rows={4} cols={50}/>
      </div>

      <button type="button" className="bg-orange-300 w-32 h-10 border border-black rounded mt-5">예약접수</button>

    </div>
  );
};

export default ModifyReserveComponent;

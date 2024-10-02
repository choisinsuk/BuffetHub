import { useParams, useNavigate } from "react-router-dom";
import NoticeComponent from "../../components/todo/NoticeComponent";

const ReadPage = () => {
  const { tno } = useParams();
  const navigate = useNavigate(); // useNavigate 추가

  const moveToModify = (num) => {
    navigate(`/modify/${num}`); // 수정 페이지로 이동
  };

  const moveToList = () => {
    navigate('/list'); // 리스트 페이지로 이동
  };

  return (
    <div className="text-3xl font-extrabold">
      <div>Todo Read Page component {tno}</div>
      <div>
        <button onClick={() => moveToModify(tno)}>Test modify</button>
        <button onClick={moveToList}>Test List</button>
      </div>
      <NoticeComponent tno={tno}></NoticeComponent>
    </div>
  );
}

export default ReadPage;

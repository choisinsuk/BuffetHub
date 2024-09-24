import { useDispatch } from "react-redux";
import { logout } from "../../slice/loginSlice";

const LogoutComponent = () => {
  const dispatch = useDispatch();
  // useDispatch는 Redux 액션을 디스패치하는 함수인 dispatch를 반환
  // 액션을 디스패치한다 = 특정 이벤트나 작업이 발생했을 때 그에 대한 정보를 Redux 스토어에 보내어 상태를 업데이트 하라고 요청을 하는것임(여기서 Redux 스토어는 store.js 파일에서 설정한 Redux 스토어를 의미함)

  const handleClickLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="border-2 border-red-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-red-500">
          로그아웃 컴포넌트
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-2/5 p-6 flex justify-center font-bold">
            <button
              className="rounded p-4 w-36 bg-red-500 text-xl text-white"
              onClick={handleClickLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutComponent;

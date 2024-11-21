import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoApi";

const KakaoLoginComponent = () => {
  const link = getKakaoLoginLink();
  return (
    <div className="flex flex-col">
      <div className="flex justify-center w-full">
        <div className="text-lg w-[400px] text-center m-6 text-white font-extrabold bg-yellow-500 shadow-sm rounded p-2">
          <Link to={link}>카카오 계정으로 시작하기</Link>
        </div>
      </div>
      <div className="text-center text-blue-500 text-lg">
        계정이 없을 시에 자동가입처리 됩니다
      </div>
    </div>
  );
};

export default KakaoLoginComponent;

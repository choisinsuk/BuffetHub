import { useParams } from "react-router-dom"; // useParams 추가
import ReserveLayout from "../../layouts/ReserveLayout";
import ModifyComponent from "../../component/reserve/ModifyComponent";
import AsideComponent from "../../component/reserve/AsideComponent";

const ModifyReservePage = () => {
  const { rsNb } = useParams(); // URL 파라미터에서 rsNb 가져오기

  const asideContent = (
    <div>
      <AsideComponent />
    </div>
  );

  const mainContent = (
    <div className="flex justify-center items-center">
      <ModifyComponent rsNb={rsNb} /> {/* rsNb를 ModifyComponent에 전달 */}
    </div>
  );

  return (
    <ReserveLayout
      asideContent={asideContent}
      mainContent={mainContent}
    />
  );
};

export default ModifyReservePage;

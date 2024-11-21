import RegistComponent from "../../component/reserve/RegistComponent";
import ReserveLayout from "../../layouts/ReserveLayout";
import AsideComponent from "../../component/reserve/AsideComponent";

const MakeReservePage = () => {
  const asideContent = (
    <div>
      <AsideComponent></AsideComponent>
    </div>
  );

  const mainContent = (
    <div className="flex justify-center items-center">
      <RegistComponent />
    </div>
  );

  return (
    <ReserveLayout
      asideContent={asideContent}
      mainContent={mainContent}
    ></ReserveLayout>
  );
};

export default MakeReservePage;

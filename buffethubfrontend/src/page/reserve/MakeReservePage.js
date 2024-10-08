import MakeReserveComponent from "../../component/reserve/MakeReserveComponent";
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
      <MakeReserveComponent />
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

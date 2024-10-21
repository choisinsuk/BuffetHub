
import ReserveComponent from "../../component/reserve/ReserveComponent";
import ReserveLayout from "../../layouts/ReserveLayout";
import AsideComponent from "../../component/reserve/AsideComponent";

const ReservePage = () => {
  const asideContent = (
    <div>
      <AsideComponent></AsideComponent>
    </div>
  );

  const mainContent = (
    <div className="flex-col border border-black p-4">
      <div className="text-4xl font-bold border border-black text-center p-4">
        예약 안내사항
      </div>
      <ReserveComponent />
    </div>
  );

  return (
    <ReserveLayout
      asideContent={asideContent}
      mainContent={mainContent}
    ></ReserveLayout>
  );
};

export default ReservePage;

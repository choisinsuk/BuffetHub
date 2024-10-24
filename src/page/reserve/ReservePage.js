
import ReserveComponent from "../../component/reserve/ReserveComponent";
import ReserveLayout from "../../layouts/ReserveLayout";
import AsideComponent from "../../component/reserve/AsideComponent";

const ReservePage = () => {
  const asideContent = (
    <div>
      <AsideComponent />
    </div>
  );

  const mainContent = (
    <div className="flex flex-col border-2 border-gray-300 bg-white shadow-lg rounded-xl p-7 transition duration-300">
      <div className="text-4xl font-bold bg-customColor3 w-full rounded-xl text-center py-4 h-24">
        <p className="pt-3 text-fontColor">예약 전 안내사항</p>
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

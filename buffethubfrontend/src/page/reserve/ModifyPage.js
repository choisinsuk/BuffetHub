import { Link } from "react-router-dom";

import ReserveLayout from "../../layouts/ReserveLayout";
import ModifyComponent from "../../component/reserve/ModifyComponent";
import AsideComponent from "../../component/reserve/AsideComponent";

const ModifyReservePage = () => {
  const asideContent = (
    <div>
      <AsideComponent></AsideComponent>
    </div>
  );

  const mainContent = (
    <div className="flex justify-center items-center"><ModifyComponent/>
    </div>
    
  );
  

  return (
    <ReserveLayout
      asideContent={asideContent}
      mainContent={mainContent}
    ></ReserveLayout>
  );
};

export default ModifyReservePage;

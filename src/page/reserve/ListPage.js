import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReserveLayout from "../../layouts/ReserveLayout";
import ListPageComponent from "../../component/reserve/ListPageComponent";
import AsideComponent from "../../component/reserve/AsideComponent";
import { useCallback } from "react";

const ChangeReservePage = () => {
  const { rsNb } = useParams();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  const queryStr = createSearchParams({ page, size }).toString();

  // const moveToModify = useCallback(
  //   (rsNb) => {
  //     navigate({
  //       pathname: `/reserve/modify/${rsNb}`,
  //       search: queryStr
  //     });
  //   },
  //   [rsNb,page,size]
  // );

  const asideContent = (
    <div>
      <AsideComponent></AsideComponent>
    </div>
  );

  const mainContent = (
    <>
      <div>
        <ListPageComponent />
      </div>
      <div>
      </div>
    </>
  );

  return (
    <ReserveLayout
      asideContent={asideContent}
      mainContent={mainContent}
    ></ReserveLayout>
    
  );
};

export default ChangeReservePage;

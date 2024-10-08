import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }

  return parseInt(param);
};

const useCustomMove = () => {
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  const [queryParams] = useSearchParams();

  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 10);
  const queryDefault = createSearchParams({ page, size }).toString();


  const moveToMyReserve = (pageParam) => {
    let queryStr = "";

    if (pageParam) {
      const pageNum = getNum(pageParam.page, page);
      const sizeNum = getNum(pageParam.size, size);

      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }

    navigate({
      pathname: `../myreserve`,
      search: queryStr,
    });
    setRefresh(!refresh);
  };

  const moveToChangeReserve = (pageParam) => {
    let queryStr = "";

    if (pageParam) {
      const pageNum = getNum(pageParam.page, page);
      const sizeNum = getNum(pageParam.size, size);

      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }

    navigate({
      pathname: `../changereserve`,
      search: queryStr,
    });
    setRefresh(!refresh);
  };

  const moveToModifyReserve = (num) => {
    console.log(queryDefault);

    navigate({
      pathname: `../modifyreserve/${num}`,
      search: queryDefault,
    });
  };
  return {
    moveToMyReserve,
    moveToModifyReserve,
    moveToChangeReserve,
    page,
    size,
    refresh
  };
};

export default useCustomMove;

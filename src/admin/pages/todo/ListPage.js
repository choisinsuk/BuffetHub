import { useSearchParams } from "react-router-dom";
import ListComponent from "../../components/todo/ListComponent";

const ListPage = () => {

  const [queryParams] = useSearchParams()
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">
        Todo List Page component {page} --- {size}
      </div>
      <ListComponent/>
        </div>
  );
}

export default ListPage;
// 실제 페이지들을 구성하면 공통적인 메뉴나 레이아웃 없이 코드를 독립적으로 만들 수 있다.

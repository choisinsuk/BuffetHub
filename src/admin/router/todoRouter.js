import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const TodoList = lazy(() => import("../pages/todo/ListPage"));
const TodoRead = lazy(() => import("../pages/todo/ReadPage"));
const TodoAdd = lazy(() => import("../pages/todo/AddPage"));
const TodoModify = lazy(() => import("../pages/todo/ModifyPage"))

const todoRouter = () => {
  return [
    {
      path: "list",
      element:
        <Suspense fallback={Loading}>
          <TodoList />
        </Suspense>
    },
    {
      path: "",
      element: <Navigate replace to="list" />,
    },
    {
      path: "read/:tno", //:은 경로의 일부를 변수로 사용하기 위한 설정으로 브라우저에서 특정 한 번호를 조회하는 용도로 사용한다.
      element: 
        <Suspense fallback={Loading}>
          <TodoRead />
        </Suspense>     
    },
    {
      path: "add",
      element:
        <Suspense fallback={Loading}>
          <TodoAdd />
        </Suspense>
    },
    {
      path: "modify/:tno",
      element:
        <Suspense fallback={Loading}>
          <TodoModify />
        </Suspense>
    }    
  ]
}

export default todoRouter;

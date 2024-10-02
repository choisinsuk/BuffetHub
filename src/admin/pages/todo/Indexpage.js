import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout  from "../../layouts/BasicLayout";
import { useCallback } from "react";

const IndexPage = () => {

  const Navigate = useNavigate()

  const handleClickList = useCallback(() => {
    Navigate({ pathname: 'list' })
  })

  const handleClickAdd = useCallback(() => {
    Navigate({ pathname:'add' })
  })

  return (
    <BasicLayout>
      <div className="w-full flex m-2 p-2 ">
        <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline">
      LIST
      </div>
      <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline">
      ADD
      </div>
      
      </div>
      <div className="flex flex-wrap w-full">
    <Outlet/>
      </div>
    </BasicLayout>
  )
};

export default IndexPage;
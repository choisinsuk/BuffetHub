import BasicMenu from "../../component/menus/BasicMenu";
import JoinComponent from "../../component/user/JoinComponent";

const JoinPage = () => {
  return (
    <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
      <BasicMenu />
      <div className="w-full flex flex-wrap h-full justify-center items-center border-2">
        <div className="text-2xl"><JoinComponent/></div>
      </div>
    </div>
  );
};

export default JoinPage;

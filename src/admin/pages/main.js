import BasicMenu from "../components/menu/BasicMenu";
import UserChart from './components/main/UserChart';

const Main = () => {
  
  return (
    <div>
      <BasicMenu />
    
      <div className="bg-white my-5 w-full flex-col space-y-4">
        <main className="bg-customColor2 w-5/6 mx-auto px-3 py-14 rounded-lg flex items-center justify-center text-center shadow-lg border-2-black ">
          <div className="text-5xl text-fontColor font-bold ">
          <p className="pb-2">관리자님<br/></p>
          <p>어서오십시오<br/></p>
          </div>
        </main>

        <div>
          <UserChart />
        </div>
      </div>

      
    </div>
  );
};


export default Main;

import BasicMenu from "../component/menus/BasicMenu";

const ReserveLayout = ({asideContent,mainContent}) => {
  return ( 
  <>
    <div className="flex flex-col h-screen">
        {/* Header - 가로 100%, 높이 10% */}
        <BasicMenu className="flex-shrink-0 h-[10%] w-full" />

        <div className="flex-1 flex flex-row">
        
        {/* Aside - 가로 20% 높이 가변*/}
        <aside className="w-40 bg-orange-100 px-1">
          {asideContent}
        </aside>

        {/* Main - 가로 100%, 높이 가변% */}
        <main className="flex-1 text-center py-10 px-5">
          {mainContent}
        </main>
      </div>

        {/* Footer - 가로 100%, 높이 10% */}
    </div>
      
    
  </>
  );
}

export default ReserveLayout;

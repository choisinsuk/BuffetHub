const PageComponent = ({ serverData, movePage }) => {
  return (
    <div className="m-6 flex justify-center w-full"> 
      {serverData.prev ? (
        <div
          className="m-2 p-2 w-16 text-center font-bold text-blue-400 cursor-pointer"
          onClick={() => movePage({ page: serverData.prevPage })}
        >
          Prev
        </div>
      ) : null}

      
      <div className="flex"> 
        {serverData.pageNumList.map((pageNum) => (
          <div
            key={pageNum}
            className={`m-2 p-2 w-12 text-center rounded shadow-md text-white cursor-pointer ${
              serverData.current === pageNum ? "bg-gray-500" : "bg-blue-400"
            }`}
            onClick={() => movePage({ page: pageNum })}
          >
            {pageNum}
          </div>
        ))}
      </div>

      {serverData.next ? (
        <div
          className="m-2 p-2 w-16 text-center font-bold text-blue-400 cursor-pointer"
          onClick={() => movePage({ page: serverData.nextPage })}
        >
          Next
        </div>
      ) : null}
    </div>
  );
};

export default PageComponent;

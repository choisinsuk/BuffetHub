const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">{message}</h2>
        <button onClick={onClose} className="bg-blue-500 text-white p-2 rounded">
          닫기
        </button>
      </div>
    </div>
  );
};

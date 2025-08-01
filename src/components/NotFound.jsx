import React from 'react';
import { useNavigate } from 'react-router-dom';
import notfound from '/404.gif';

function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center z-[999]">
      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 text-white text-3xl hover:text-red-500 transition-all duration-200"
      >
        &times;
      </button>

      {/* GIF */}
      <img
        src={notfound}
        alt="404 Not Found"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
}

export default Notfound;

// import React from 'react'
// import loader from "/loading.gif"
// function Loading() {
//   return (
//     <div className='w-screen h-screen flex justify-center items-center bg-black'>
//       <img className='h-[50%] object-cover' src={loader} alt="" />
//     </div>
//   )
// }

// export default Loading

import React, { useEffect, useState } from 'react';
import loader from "/loading.gif";

function Loading() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Show VPN warning after 5 seconds
    const timer = setTimeout(() => {
      setShowWarning(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black text-white px-4 text-center">
      <img className="h-[50%] object-cover mb-4" src={loader} alt="Loading..." />
      {showWarning && (
        <p className="text-zinc-400 text-sm mt-4">
          ⚠️ This app fetches data from an external API. If it stays stuck here, please try using a VPN to access content.
        </p>
      )}
    </div>
  );
}

export default Loading;

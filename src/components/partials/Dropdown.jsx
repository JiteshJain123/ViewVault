import React, { useState } from "react";

function Dropdown({ title, options, func }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Dropdown */}
      <div className="hidden sm:block w-auto">
        <select
          defaultValue="0"
          onChange={func}
          className="w-full px-3 py-2 bg-zinc-800 text-white rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm sm:text-base"
        >
          <option value="0" disabled hidden>
            {title}
          </option>
          {options.map((o, i) => (
            <option key={i} value={o}>
              {o.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="sm:hidden">
        <button
          className="text-white bg-zinc-800 px-4 py-2 rounded-md text-sm"
          onClick={() => setMobileMenuOpen(true)}
        >
          ☰ {title}
        </button>
      </div>

      {/* Mobile Fullscreen Modal */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-zinc-900 bg-opacity-95 z-[999] flex flex-col items-center justify-center p-6">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            &times;
          </button>
          <h2 className="text-white text-xl mb-6">{title}</h2>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {options.map((o, i) => (
              <button
                key={i}
                onClick={() => {
                  func({ target: { value: o } });
                  setMobileMenuOpen(false);
                }}
                className="bg-zinc-700 text-white py-3 px-4 rounded-md text-center text-lg hover:bg-zinc-600 transition-all"
              >
                {o.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Dropdown;

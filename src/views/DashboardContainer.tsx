import React from "react";
import placeholderLogo from "../assets/logo_placeholder.png";

const DashboardContainer = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header with a bottom border */}
      <header className="bg-white p-4 flex justify-between items-center shadow border-b border-gray-300">
        <div className="flex items-center">
          {/* Placeholder for the logo */}
          <img
            src={placeholderLogo}
            alt="Sweet Delights"
            className="h-8 mr-28"
          />
        </div>
        {/* Title next to the sidebar */}
        <div className="flex-grow">
          <span className="text-lg font-semibold">Sweet Delights</span>
        </div>
        <div className="flex items-center">
          {/* Placeholder for right-side header content */}
          <button className="text-sm">P</button>
        </div>
      </header>

      {/* Content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with right border */}
        <aside className="w-64 bg-white p-6 border-r border-gray-300">
          <nav className="space-y-1">
            {/* Sidebar links */}
            <a href="#" className="block p-2 bg-blue-500 text-white rounded">
              Business Info
            </a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">
              Certifications
            </a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">
              Loans
            </a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">
              Subsidiaries
            </a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">
              People
            </a>
          </nav>
        </aside>

        {/* Main content with left and right borders */}
        <main className="flex-1 p-6 overflow-auto border-r border-l border-gray-300">
          <div className="bg-white p-6 shadow rounded-lg">
            {/* Main content */}
          </div>
        </main>

        {/* Right-hand side panel with left border */}
        <aside className="w-1/4 bg-white p-6 border-l border-gray-300 hidden lg:block">
          <h2 className="text-lg font-semibold mb-4">Nearby Events</h2>
          {/* Right-side content */}
        </aside>
      </div>
    </div>
  );
};

export default DashboardContainer;

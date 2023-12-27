import React from 'react';

const DashboardContainer = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        {/* Sidebar content */}
      </aside>

      {/* Main container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center p-4 shadow-md">
          {/* Header content */}
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {/* Main panel content */}
        </main>
      </div>

      {/* Right-side panel */}
      <aside className="w-1/4 bg-white shadow-md hidden lg:block">
        {/* Right-side content */}
      </aside>
    </div>
  );
};

export default DashboardContainer;

import React from 'react';
import SBAHeader from '../components/Header/Header';
import CustomSideNav from '../components/SideNav/SideNav';

const DashboardContainer = () => {
  return (
    <div className="flex flex-col h-screen bg-white-100">
      <SBAHeader />
      <div className="flex flex-1 overflow-hidden">
        <CustomSideNav />
        {/* Main content with left and right borders */}
        <main className="flex-1 p-6 overflow-auto border-r border-l border-light-grey-border">
          <div className="bg-white p-6 shadow rounded-lg">
            {/* Main content */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardContainer;

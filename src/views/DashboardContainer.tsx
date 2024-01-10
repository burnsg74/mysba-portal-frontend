import React from 'react';
import MaterialHeader from '../components/Header/MaterialHeader';
import CustomSideNav from '../components/SideNav/MaterialSideNav';

const DashboardContainer = () => {
  return (
    <div className="flex flex-col h-screen bg-white-100">
      <MaterialHeader />
      <div className="flex flex-1 overflow-hidden">
        <CustomSideNav />
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

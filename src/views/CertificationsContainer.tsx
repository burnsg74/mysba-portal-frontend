import React from 'react';
import MaterialHeader from '../components/Header/MaterialHeader';
import CustomSideNav from '../components/SideNav/MaterialSideNav';

const CertificationsContainer = () => {
  return (
    <div className="flex flex-col h-screen bg-white-100">
      <MaterialHeader />
      <div className="flex flex-1 overflow-hidden">
        <CustomSideNav />
        {/* Main content with left and right borders */}
          <main className="flex-1 p-6 overflow-auto border-r border-l border-light-grey-border">
              {/* Main content */}
              <h1>Certifications</h1>
          </main>
      </div>
    </div>
  );
};

export default CertificationsContainer;

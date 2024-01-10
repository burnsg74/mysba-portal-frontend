import React from 'react';
import SBAHeader from '../components/Header/Header';
import CustomSideNav from '../components/SideNav/SideNav';

const CertificationsContainer = () => {
  return (
    <div className="flex flex-col h-screen bg-white-100">
      <SBAHeader />
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

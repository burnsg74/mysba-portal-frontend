import React from 'react';
import RightContent from "src/components/RightContent/RightContent";
import 'src/pages/Dashboard/Dashboard.css'

const Dashboard = () => {
    return (
        <div className="grid-row">
            <div className="grid-col">
                <h1>Dashboard</h1>
            </div>
            <div className="grid-col-auto">
                <RightContent/>
            </div>
        </div>
    );
};

export default Dashboard;

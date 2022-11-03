import React from "react";
import NavBar from "../../Organisms/Navbar/NavBar";
import SideBar from "./../../Organisms/SideBar/SideBar";
import CreateForm from "../../Organisms/CreateForm/CreateForm";
import DoughnutChart from "../../Molecules/Chart/DoughnutChart/DoughnutChart";

function DashboardTemplate() {
    return (
        <div className="flex flex-row select-none">
            <div className="z-10">
                <SideBar handle={false} setName={false} dashboard={true} />
            </div>
            <div>
                <div className="flex flex-col justify-start ml-72 ">
                    <NavBar dashboard={true} />
                </div>
                <div className="w-96 mt-40 ml-10">
                    <DoughnutChart />
                    {/* <CreateForm /> */}
                </div>
            </div>
        </div>
    );
}

export default DashboardTemplate;

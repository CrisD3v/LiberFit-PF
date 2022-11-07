import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../App/Hooks/Hooks";

import DashHome from "./Content/DashHome";
import DashEmpleados from "./Content/DashEmpleados";
import DashClientes from "./Content/DashClientes";
import Ejercicios from "../Cliente/Content/Ejercicios";
import DashProducts from "./Content/DashProducts";

import { getFilterData } from "../../../../App/Action/FilterActions";
import { getMainData } from "../../../../App/Action/Action";
import TrainingsForm from "../../../Molecules/CreateInputsContainer/trainingsForm/trainingsForm";
import Cookies from "universal-cookie";
function DashAdmin() {
    const cookies = new Cookies();
    // TODO botones de modificacion de cada item
    const [addItem, setAddItem] = useState(false);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getFilterData());
        dispatch(getMainData());
    }, [dispatch]);
    const location = useLocation();

    useEffect(() => {
        setAddItem(false);
    }, [location]);
    Cookies;

    const background = {
        background:
            "linear-gradient(180deg, #F94B40 0%, #B53B3B 56.25%, #FF0000 99.99%)",
    };

    return (
            
        <div className="">
            {cookies.get("RolId") === "1" && (
            <div>
                {location.pathname === "/dashboard/admin/home" ? (
                    <DashHome />
                ) : location.pathname === "/dashboard/admin/employees" ? (
                    <DashEmpleados link={"employees"} />
                ) : location.pathname === "/dashboard/admin/Products" ? (
                    <DashProducts />
                ) : location.pathname === "/dashboard/admin/ejercicios" ? (
                    <Ejercicios />
                ) : location.pathname === "/dashboard/admin/clients" ? (
                    <DashClientes link={"clients"} />
                ) : null}
            </div>)}
        </div>
    );
}

export default DashAdmin;

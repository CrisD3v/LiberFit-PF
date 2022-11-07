import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import arraySet from "../../utils/arraySet";
import { useLocation, useParams } from "react-router-dom";

export interface filterState {
    data: any;
    locations: [];
    user: any;
    clients: any;
    employees: any;
    payment: any;
}

const initialState: filterState = {
    data: ["data"],
    locations: [],
    user: [],
    payment: [],
    clients: [],
    employees: [],
};

const dataSlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        getData: (state, action: PayloadAction<any>) => {
            state.locations = action.payload;
        },
        getLocationsReducer: (state, action: PayloadAction<any>) => {
            state.locations = action.payload;
        },
        getUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        getClientsReducer: (state, action: PayloadAction<any>) => {
            state.clients = action.payload;
        },
        getEmployeesReducer: (state, action: PayloadAction<any>) => {
            state.employees = action.payload.datoEmpleadoTot
        },
        postPayment: (state, action: PayloadAction<any>) => {
            state.payment = action.payload;
        },
    },
});

export default dataSlice.reducer;
export const { getData, getLocationsReducer, getUser, getClientsReducer,getEmployeesReducer,postPayment } = dataSlice.actions;


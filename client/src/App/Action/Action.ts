import axios from "axios";
import Json from "../../assets/gym.json";
import arraySet from "../utils/arraySet";
import { modalOpen } from "../FeatureSlices/Modal/Modal";
import {
    filterDataPrice,
    openFilter,
    filterDataName,
} from "../FeatureSlices/Filters/Filter";
import {
    getData,
    getLocationsReducer,
    getUser,
    getClientsReducer,
    postPayment,
    getEmployeesReducer,
} from "../FeatureSlices/Data/Data";
import { getAllUsers, postUsers } from "../FeatureSlices/Users/Users";
import { login } from "../FeatureSlices/login/login";

const data = Json[0].sedes.map((d) => d.products.map((d) => d.name));
const exercises = Json[0].exercises.map((d) => d);
const products = Json[0].sedes.map((d) => d.products.map((d) => d));

const Route = import.meta.env.VITE_LOCAL_HOST
const BASE_URL = import.meta.env.VITE_API;

export const getMainData = () => async (dispatch: any) => {
    try {

        const locations = await axios.get(`${BASE_URL || Route}/locacion`);

        dispatch(getData(locations.data));
    } catch (error) {
        console.log(error);
    }
};

export const getLocations = () => async (dispatch: any) => {
    try {

        const locations = await axios.get(`${BASE_URL || Route}/locacion`);

        dispatch(getLocationsReducer(locations.data));
    } catch (error) {
        console.log(error);
    }
};

export const getClients = () => async (dispatch: any) => {
    try {
        const clients = await axios.get(`${BASE_URL || Route}/clients`);
        dispatch(getClientsReducer(clients.data));
    } catch (error) {
        console.log(error);
    }
};

export const getEmployees = () => async (dispatch: any) => {
    try {
        const employee = await axios.get(`${BASE_URL || Route}/empleado`);
        dispatch(getEmployeesReducer(employee.data));
    } catch (error) {
        console.log(error);
    }
};

export const getDataByName = (name: any) => (dispatch: any) => {
    const dataSet = arraySet(data.flat());
    // dispatch(filterDataName(dataSet.map(d => d).filter(d => d.toLowerCase().includes(name))))
    dispatch(filterDataName(name));
};

export const getDataByPrice =
    (maxPrice: any, minPrice: any) => (dispatch: any) => {
        const dataSet = arraySet(products.flat());
        dispatch(
            filterDataPrice(
                dataSet
                    .map((d) => d)
                    .filter((d) => minPrice <= d.price <= maxPrice)
            )
        );
    };

export const filterProductsByPrice =
    (minPrice: any, maxPrice: any) => (dispatch: any) => {
        dispatch(filterDataPrice([minPrice, maxPrice]));
    };

export const openModal = (active: boolean) => (dispatch: any) => {
    dispatch(modalOpen(active));
};

export const openFilters = (active: boolean) => (dispatch: any) => {
    dispatch(openFilter(active));
};

export const getUsers = () => async (dispatch: any) => {
    axios("") // endpoint de todos los users
        .then((res) => dispatch(getAllUsers(res)))
        .catch((e) => console.log(e));
};

export const postUser = (payload: any) => async (dispatch: any) => {
    try {
        let json = await axios.post(`${BASE_URL || Route}/clients`,payload) // enpoint de post user
        console.log(json)
        return json
    } catch (error) {
        console.log("--->", error);
    }
};

export const editUser = (payload: any) => async (dispatch: any) => {
    try {
        let json = await axios.put(`${BASE_URL || Route}/clients`,payload) // enpoint de post user
        console.log(json)
        return json
    } catch (error) {
        console.log("--->", error);
    }
};

export const changePassword = (payload: any) => async (dispatch: any) => {
    try {
        let json = await axios.put(`${BASE_URL || Route}/clients?changePassword=true`, payload ) // enpoint de post user
        console.log(json)
        return json.data
    } catch (error:any) {
        
    }
}

export const changeProfileImage = (payload: any) => async (dispatch: any) => {
    console.log(payload);
    try {
        let json = await axios.put(`${BASE_URL || Route}/clients?changeProfileImage=true`, payload , {
            headers: {
                'Content-Type': 'multipart/form-data'

            }
        }
        ); // enpoint de post user
        console.log(json);
        return json.data;
    } catch (error: any) {
        console.log(error);
    }
};

export const postElement =
    (payload: any, element: string) => (dispatch: any) => {
        try {
            let json = axios.post(`${Route || BASE_URL}/${element}`, payload);
            console.log("Action");
            console.log(payload);
        } catch (error) {
            console.log(error);
        }
    };

export const loginAction = (payload:any) => async (dispatch: any) => {
    try {       
        let json = await axios.post(`${BASE_URL || Route}/login`, payload) // {email, password}
        // console.log("-->",json)
        return json; // {}
    } catch (error) {
        console.log("login -->", error);
    }
};

export const loginGoogle = (payload: any) => async (dispatch: any) => {
    try {
        console.log("carlos-->",payload);
        
        let json = await axios.post(`${BASE_URL || Route}/logup`, payload) // {email,picture,name,password}
        console.log("cuenta google -->", json)
        return json
    } catch (error) {
        console.log("error: login google -->", error);
    }
};

export const cerrarLogin = () => async (dispatch: any) => {
    try {
        let json = await axios.get(`${BASE_URL || Route}/logout`)
        console.log("loginCerrado --->",json)
        return json
    } catch (error) {
        console.log(error);
    }
};

export const getUserInfo = (payload: any) => async (dispatch: any) => {
    try {
        let json = await axios.get(`${BASE_URL || Route}/clients`,  {params: {id: payload}}) // {email, password}
        dispatch(getUser(json.data[0]))
        return json // {}
    } catch (error) {
        console.log("-->", error);
    }
};

export const postPaymentPaypal = (payload: any) => async (dispatch: any) => {
    try {
        const res = await axios.post(`${BASE_URL || Route}/create-order`,payload)
        dispatch(postPayment(payload))
        return res     
    } catch (error) {
        
    }
}
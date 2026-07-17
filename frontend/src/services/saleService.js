import api from "./api";

// Add Sale
export const addSale = async (data) => {
    const response = await api.post("/sale/add", data);
    return response.data;
};

// Today's Sale
export const getTodaySale = async () => {
    const response = await api.get("/sale/today");
    return response.data;

};

export const calculateParcel = async (data) => {
    const response = await api.post("/calculate", data);
    return response.data;
};

export const getTotalRevenue = async () => {

    const response = await api.get("/sale/revenue");

    return response.data;

};


export const removeSale = async (data) => {
    const response = await api.post("/sale/remove", data);
    return response.data;
};

// Isko apne saleService.js me add karein agar pehle se nahi hai
export const getWeeklySale = async () => {
    const response = await api.get(`/sale/weekly`); // Aapka backend endpoint
    return response.data;
};

export const getMonthlySale = async () => {
    const response = await api.get(`/sale/monthly`); // Aapka backend endpoint
    return response.data;
};
import axios from 'axios';

const API_URL = "http://127.0.0.1:5000/";

export const fetchData = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

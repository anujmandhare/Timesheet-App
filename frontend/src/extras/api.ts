import axios from 'axios';

import CONSTANTS from './constants.json';
const { URL } = CONSTANTS;

interface Error {
    response: { data: string },
    request: string,
    message: string,
}

const getToken = () => {
    const user = localStorage?.user ? JSON.parse(localStorage.user) : '';
    const token = user.token;
    return { 'Authorization': token };
}

const handleError = (error: Error) => {
    if (error.response) {
        alert(error.response.data);
    } else if (error.request) {
        alert(error.message);
    } else {
        alert(error.message);
    }
}

async function GET(path: string, queryParameters?: any) {

    const headers = getToken();
    const config = { headers }
    let data;
    if (queryParameters) {
        data = { params: queryParameters, ...config }
    }

    return axios.get(URL.concat(path), data)
        .then(response => response.data)
        .catch(handleError);
}

async function POST(path: string, payload: Object) {

    const headers = getToken();
    return axios.post(URL.concat(path), payload, { headers })
        .then(response => response.data)
        .catch(handleError);
}

async function PUT(path: string, payload: Object) {

    const headers = getToken();
    return axios.put(URL.concat(path), payload, { headers })
        .then(response => response.data)
        .catch(handleError);
}

async function DELETE(path: string, payload: Object) {

    return axios.delete(URL.concat(path), payload)
        .then(response => response.data)
        .catch(handleError);
}

export { GET, POST, PUT, DELETE }
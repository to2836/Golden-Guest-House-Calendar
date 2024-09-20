import { postApi } from './axios';


export const loginAPI = async (data) => {
        const url = '/apiv1/users/signin';
        const result = await postApi(url, data);
        return result;
}

export const logoutAPI = async (data) => {
    const url = '/apiv1/users/logout';
    const result = await postApi(url, data);
    return result;
}
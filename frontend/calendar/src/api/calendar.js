import { getApi, postApi } from './axios';


export const calendarEventListAPI = async (date) => {
    const url = `/apiv1/calendars/event?date=${date}`;
    const result = await getApi(url);
    return result;
}

export const calendarEventCreateAPI = async (data) => {
    const url = '/apiv1/calendars/event';
    const result = await postApi(url, data);
    return result;
}






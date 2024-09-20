import { getApi, postApi, patchApi, deleteApi } from './axios';


export const calendarEventListAPI = async (date) => {
    const url = `/apiv1/calendars/events?date=${date}`;
    const result = await getApi(url);
    return result;
}

export const calendarEventCreateAPI = async (data) => {
    const url = '/apiv1/calendars/events';
    const result = await postApi(url, data);
    return result;
}

export const calendarEventUpdateAPI = async (pk, data) => {
    const url = `/apiv1/calendars/events/${pk}`;
    const result = await patchApi(url, data);
    return result;
}

export const calendarEventDeleteAPI = async (pk, data) => {
    const url = `/apiv1/calendars/events/${pk}?bulk=${data.bulk}`;
    const result = await deleteApi(url, data);
    return result;
}





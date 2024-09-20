import axios from 'axios';


axios.interceptors.response.use(function (response) {
  // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
  // 응답 데이터가 있는 작업 수행
  return response;
}, function (error) {
  // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
  // 응답 오류가 있는 작업 수행
  if (error.response.status === 401 && window.location.pathname !== '/signin') {
    // console.log('401')
    window.location.href = '/signin'
  }
  return Promise.reject(error);
});


export const getCookie = (name) => {
  var cookieValue = null
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';')
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

export const deleteCookie = (name) => {
  const hostname = document.location.hostname;
  const currentDomain = hostname.split('.').slice(-2).join('.');
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${currentDomain}`;
}

const access = getCookie('access')

let origin = '';
if(process.env.REACT_APP_ENV === 'local' && window.location.port != 8000) {
  origin = 'http://localhost.com:8000'
}

export const getApi = (url, header={}, responseType=null) => {
  const csrftoken = getCookie('csrftoken')
  const headers = {
    ...header,
    'X-CSRFToken': csrftoken,
    'Authorization': `Bearer ${access}`
  }

  const getUrl = origin + url;

  const validResponseTypes = ['arraybuffer', 'blob', 'document', 'json', 'text', 'stream'];
  const config = {
    headers,
  };
  if (responseType && validResponseTypes.includes(responseType)) {
    config.responseType = responseType;
  }
  return axios
    .get(getUrl, config)
    .then(response => response.data)
}

export const postApi = (url, data, header = {}) => {
  const csrftoken = getCookie('csrftoken')
  const headers = {
    ...header,
    'X-CSRFToken': csrftoken,
    'Authorization': `Bearer ${access}`
  }
  console.log('origin', origin)
  const postUrl = origin + url;
  return axios
    .post(postUrl, data, { headers })
    .then(response => response)
}

export const patchApi = (url, data, header = {}) => {
  const csrftoken = getCookie('csrftoken')
  const headers = {
    ...header,
    'X-CSRFToken': csrftoken,
    'Authorization': `Bearer ${access}`
  }
  const patchUrl = origin + url;
  return axios
    .patch(patchUrl, data, { headers })
    .then(response => response)
}

export const deleteApi = (url) => {
  const csrftoken = getCookie('csrftoken')
  const headers = {
    'X-CSRFToken': csrftoken,
    'Authorization': `Bearer ${access}`
  }


  const deleteUrl = origin + url;

  return axios
    .delete(deleteUrl, { headers })
    .then(response => response)
}
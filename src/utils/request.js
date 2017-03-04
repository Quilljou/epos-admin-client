import axios from 'axios';
// const reqwest = require('reqwest');
import { message } from 'antd';
import { hashHistory } from 'dva/router';
import  Auth from './auth';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }


  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function filterData(response) {
  if(response.success) {
    message.success(response.message);
    return response.data;
  }else {
    message.error(response.message);
  }
};


function checkLogin(response) {
  if(response.data && response.data.login === false) {
    hashHistory.push('/login');
    Auth.logout();
    message.error(response.data.message);
    return false;
  }
  return response
}
// 是先检查登录状态，还是先检查状态码
// 应该是先检查状态码，如果5xx或者4xx的话也不会有response.data返回



export  function request (options) {
    const token = localStorage.getItem('token');
    if(token) {
      const headers = {
          Authorization: "Bearer " + token
        }
        if(!options.headers) {
          options.headers = {};
        }
        options.headers.Authorization = "Bearer " + token;
    //   options.headers = Object.assign({},options.headers,headers)
    }

    return axios(options)
    .then(checkLogin)
    .then(checkStatus)
    .then((response) => {
      if(options.nofilter === true) {
        if(response.success) {
           message.success(response.message);
        }else {
          message.error(response.message);
        }
        return response;
      }else {
        return filterData(response);
      }
    })
    .catch((err) => {
      message.error('网络错误，请稍后重试')
    })
}

export function getUrl(url) {
  const base = 'http://112.74.34.58:8888';
  // var base = 'http://localhost:8888/api';
  return base + url;
}

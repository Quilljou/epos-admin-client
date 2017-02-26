import axios from 'axios';
// const reqwest = require('reqwest');
import { message } from 'antd';


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


export default function request (options) {
    return axios(options)
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

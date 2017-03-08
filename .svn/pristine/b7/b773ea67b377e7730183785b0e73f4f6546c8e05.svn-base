import qs from 'qs';
// import { message } from 'antd';
import {request, getUrl} from '../utils/request';


// var base = 'http://112.74.34.58:8888';
// function getUrl(url) {
//     return base + url;
// }




export  async function create (params) {
  return request({
    url: getUrl('/tenant'),
    method: 'post',
    params
  })
}

export async function query (params) {
  return request({
    url: getUrl('/tenant'),
    method: 'get',
    params
  })
}


export async function del (data) {
  var id = data.id;
  return request({
    url: getUrl(`/tenant/delete/${id}`),
    method: 'post',
    nofilter: true
  })
}


export async function renew (payload) {
  const { id, renewTime } = payload;
  return request({
    url: getUrl(`/tenant/renew/${id}`),
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: qs.stringify({renewTime}),
  })
}


export async function updatePassword (payload) {
  const { currentItem, ...data } = payload;
  const id = currentItem.id;
  return request({
    url: getUrl(`/tenant/password/${id}`),
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: qs.stringify(data),
  })
}

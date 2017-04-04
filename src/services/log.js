import qs from 'qs';
// import { message } from 'antd';
import {request, getUrl} from '../utils/request';



export async function query (params) {
  return request({
    url: getUrl('/log'),
    method: 'get',
    params
  })
}

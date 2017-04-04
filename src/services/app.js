import {request, getUrl } from '../utils/request';
import qs from 'qs';


export async function login(payload) {
    return request({
        url: getUrl('/login'),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'post',
        data: qs.stringify(payload)
    })
}


export async function logout(payload) {
    return request({
        url: getUrl('/version/1'),
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'},
        data: payload
    })
}

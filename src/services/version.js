import {request, getUrl } from '../utils/request';
import qs from 'qs';


export async function query(payload) {
    return request({
        url: getUrl('/version'),
        params: payload
    })
}


export async function add(payload) {
    return request({
        url: getUrl('/version'),
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(payload)
    })
}

export async function update(payload) {
    const {id , data} = payload;
    return request({
        url: getUrl(`/version/${id}`),
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(payload)
    })
}

export async function del(id) {
    return request({
        url: getUrl(`/version/delete/${id}`),
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        nofilter: true
    })
}

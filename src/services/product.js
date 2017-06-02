import {request, getUrl } from '../utils/request';
import qs from 'qs';


export async function queryProduct() {
    return request({
        url: getUrl('/client'),
    })
}


export async function addProduct(payload) {
    return request({
        url: getUrl('/client'),
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(payload)
    })
}

export async function deleteProduct(id) {
    return request({
        url: getUrl(`/client/delete/${id}`),
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        nofilter: true
    })
}

export async function updateProduct(payload) {
    const id = payload.id;
    const data = qs.stringify(payload);
    return request({
        url: getUrl(`/client/${id}`),
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data
    })
}

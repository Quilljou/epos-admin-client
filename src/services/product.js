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

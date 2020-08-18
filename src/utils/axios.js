// axios相关工具集

import axios from 'axios'

const BASE_URL = 'https://api.mtnhao.com/'

export const request = createBaseInstance()

function createBaseInstance() {
    // 创建请求实例
    const instance = axios.create({
        baseURL: BASE_URL
    })
    // 添加响应拦截器
    instance.interceptors.response.use(handleResponse, handleError)
    return instance
}

function handleResponse(response) {
    return response.data
}

function handleError(e) {
    throw e
}
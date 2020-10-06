// axios相关工具集

import axios from 'axios'
import { Loading } from 'element-ui'
import store from '@/store'

const BASE_URL = 'http://localhost:3000'

// 不带全局loading的请求实例
export const requestWithoutLoading = createBaseInstance() 

// 带全局loading的请求实例
// 传入函数是因为需要在处理请求结果handleResponse之前处理loading
// 所以要在内部插入loading拦截器的处理逻辑
export const request = createBaseInstance()
mixinLoading(request.interceptors)

// 通用的axios实例
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

// 插入loading拦截器
let loading
let loadingCount = 0
const SET_AXIOS_LOADING = 'global/setAxiosLoading'
function mixinLoading(interceptors) {
    // 添加请求拦截器
    interceptors.request.use(loadingRequestInterceptor)
    // 添加响应拦截器
    interceptors.response.use(loadingResponseInterceptor, loadingResponseErrorInterceptor)

    // 在请求中调用ElementUI的Loading服务，并记录在store
    function loadingRequestInterceptor(config) {
        // 单例
        if (!loading) {
            loading = Loading.service({
                target: 'body',
                background: 'transparent',
                text: '载入中'
            })
            store.commit(SET_AXIOS_LOADING, true)
        }
        // eslint-disable-next-line no-unused-vars
        loadingCount++

        return config
    }

    function loadingResponseInterceptor(response) {
        handleResponseLoading()
        return response
    }

    function loadingResponseErrorInterceptor(e) {
        handleResponseLoading()
        throw(e)
    }

    // 在所有请求响应后，结束Loading服务
    function handleResponseLoading() {
        loadingCount--
        if (loadingCount === 0) {
            loading.close()
            loading = null
            store.commit(SET_AXIOS_LOADING, false)
        }
    }
}
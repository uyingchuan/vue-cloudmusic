import { request } from '@/utils'

export const getAllMvs = (params) => request.get(`/mv/all`, {params})

export const getMvUrl = id => request.get(`/mv/url?id=${id}`)

export const getMvDetail = id => request.get(`/mv/detail?mvid=${id}`)

export const getSimiMv = id => request.get(`/simi/mv?mvid=${id}`)
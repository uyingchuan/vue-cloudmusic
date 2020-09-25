import { request } from '@/utils'

export const getAllMvs = (params) => request.get(`/mv/all`, {params})
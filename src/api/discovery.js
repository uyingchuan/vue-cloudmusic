import { request } from 'utils'

export const getBanner = () => request.get('/banner?type=0')
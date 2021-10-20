import { request } from './public';

//获取全国的行政区
export function getProvince() {
  return request({
    url: 'https://restapi.amap.com/v3/config/district?'
  })
}
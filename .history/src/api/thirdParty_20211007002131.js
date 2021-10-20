import { request } from './public';

//获取全国的行政区
export function getProvince() {
  return request({
    url: 'https://restapi.amap.com/v3/config/district?key=10f62ca2e83e6734be5b3a86f8cefc18&keyword=100000&subdistrict=3'
  })
}
import { request } from './public';

//获取全国的行政区
export function getRegion(keywords, subdistrict) {
  return request({
    url: 'https://restapi.amap.com/v3/config/district',
    params: {
      key: '10f62ca2e83e6734be5b3a86f8cefc18',
      keywords,
      subdistrict,
    }
  })
}

// ip定位
export function getGeography(ip) {
  return request({
    url: '',
  })
}
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
export function getGeography(ip, type) {
  return request({
    url: '',
    params: {
      key: 'eed54cd49ee4b8acaab87a5baf1025d3',
      type: type = 4,
      ip,
    }
  })
}
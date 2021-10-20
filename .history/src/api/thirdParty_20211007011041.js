import { request } from './public';

//获取全国的行政区
export function getProvince(keyword, subdistrict) {
  return request({
    url: 'https://restapi.amap.com/v3/config/district',
    query: {
      key: '10f62ca2e83e6734be5b3a86f8cefc18',
      keyword,
      subdistrict,
    }
  })
}
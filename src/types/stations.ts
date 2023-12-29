// line_num: 호선 / Line Number
// station_nm_chn: 전철명명(중문) / Station Name (Chinese)
// station_cd: 전철역코드 / Station Code
// station_nm_jpn: 전철명명(일문) / Station Name (Japanese)
// station_nm_eng: 전철명명(영문) / Station Name (English)
// station_nm: 전철역명 / Station Name
// fr_code: 외부코드 / External Code

export type Stations = {
  line_num: string;
  station_nm_chn: string;
  station_cd: string;
  station_nm_jpn: string;
  station_nm_eng: string;
  station_nm: string;
  fr_code: string;
}[];

export type SubwayApiResponse = {
  errorMessage: {
    status: number;
    code: string;
    message: string;
    link: string;
    developerMessage: string;
    total: number;
  };
  realtimeArrivalList: RealtimeArrivalItem[];
};

// https://data.seoul.go.kr/dataList/OA-12764/F/1/datasetView.do

export type RealtimeArrivalItem = {
  beginRow: null;
  endRow: null;
  curPage: null;
  pageRow: null;
  totalCount: number;
  rowNum: number;
  selectedCount: number;
  subwayId: string;
  subwayNm: null;
  updnLine: string;
  trainLineNm: string;
  subwayHeading: null;
  statnFid: string;
  statnTid: string;
  statnId: string;
  statnNm: string;
  trainCo: null;
  trnsitCo: string;
  ordkey: string;
  subwayList: string;
  statnList: string;
  btrainSttus: string;
  barvlDt: string;
  btrainNo: string;
  bstatnId: string;
  bstatnNm: string;
  recptnDt: string;
  arvlMsg2: string;
  arvlMsg3: string;
  arvlCd: string;
};

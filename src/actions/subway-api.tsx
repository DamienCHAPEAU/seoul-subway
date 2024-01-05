import { SubwayApiResponse } from '@/types/api-subway-info';

export async function getSubwayInfo({ stationName }: { stationName: string }) {
  const response = await fetch(
    `http://swopenAPI.seoul.go.kr/api/subway/6378464e4a776b643131375451674c43/json/realtimeStationArrival/0/4/${stationName}`,
    {
      next: { revalidate: 10 },
    }
  );
  const result: SubwayApiResponse = await response.json();
  return result;
}

import { serverClient } from '@/app/_trpc/serverClient';
import { getSubwayInfo } from '@/actions/subway-api';

export default async function LinesPage({
  params,
}: {
  params: { stationId: string };
}) {
  const stationId = parseInt(params.stationId);
  const station = await serverClient.getStation({
    stationId: stationId,
  });
  if (!station) {
    return <>404</>;
  }

  const latestData = await getSubwayInfo({ stationName: station.stationName });
  return (
    <div>{latestData.realtimeArrivalList.map((data) => data.btrainSttus)}</div>
  );
}

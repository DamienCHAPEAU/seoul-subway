import { serverClient } from '@/app/_trpc/serverClient';
import { getSubwayInfo } from '@/actions/subway-api';
import SubwayCard from '@/components/subway-card';
import SubwayView from '@/components/subway-view';
import { RouterOutput } from '@/app/_trpc/client';

export default async function LinesPage({
  params,
}: {
  params: { stationId: string };
}) {
  const station = await serverClient.getStation({
    stationId: params.stationId,
  });
  if (!station) {
    return <>404</>;
  }

  const latestData = await getSubwayInfo({ stationName: station.stationName });
  const realtimeArrival = latestData.realtimeArrivalList[0];

  // const incomingTrains = realtimeArrival.filter(
  //   (train) => train.statnFid === params.stationId
  // );
  // const outgoingTrains = realtimeArrival.filter(
  //   (train) => train.statnId === params.stationId
  // );

  // // Sort incoming trains based on statnFid
  // incomingTrains.sort((a, b) => a.statnFid.localeCompare(b.statnFid));

  // // Sort outgoing trains based on statnFid
  // outgoingTrains.sort((a, b) => a.statnFid.localeCompare(b.statnFid));

  // console.log(incomingTrains);
  // console.log(outgoingTrains);

  // Now you have two arrays: incomingTrains and outgoingTrains, both sorted based on statnFid

  const [statnFid, statnId] = await Promise.all([
    serverClient.getStation({
      stationId: realtimeArrival.statnFid,
    }),
    serverClient.getStation({
      stationId: realtimeArrival.statnId,
    }),
  ]);

  // console.log(latestData);

  return (
    <>
      <SubwayCard data={latestData.realtimeArrivalList[0]} />
      <SubwayView
        statnFname={statnFid.stationName}
        statnName={statnId.stationName}
        barvlDt={realtimeArrival.barvlDt}
        arvlMsg2={realtimeArrival.arvlMsg2}
        arvlMsg3={realtimeArrival.arvlMsg3}
        btTrainNo={realtimeArrival.btrainNo}
      />
    </>
  );
}

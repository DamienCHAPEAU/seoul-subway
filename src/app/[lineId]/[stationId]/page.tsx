import { serverClient } from '@/app/_trpc/serverClient';
import { getSubwayInfo } from '@/actions/subway-api';
import SubwayCard from '@/components/subway-card';
import SubwayView from '@/components/subway-arrival';
import {
  RealtimeArrivalItem,
  SubwayApiResponse,
} from '@/types/api-subway-info';

// Define a function to get the station name
const getStationName = async (statnFid: string) => {
  const { stationName } = await serverClient.getStation({
    stationId: statnFid,
  });
  return stationName;
};

const getOrderedTrains = async (
  realtimeArrival: SubwayApiResponse['realtimeArrivalList']
) => {
  // Create an object to store variables based on statnFid (previous station)
  const trainsListOrdered = {} as Record<
    string,
    SubwayApiResponse['realtimeArrivalList']
  >;

  // Iterate through the realtimeArrival array
  const promises = realtimeArrival.map(async (arrival) => {
    const statnFid = arrival.statnFid;
    // Get the station name from the statnFid (not return by the API)
    arrival.statnFNm = await getStationName(statnFid);
    // Check if the statnFid already has an entry in the object
    if (!trainsListOrdered[statnFid]) {
      trainsListOrdered[statnFid] = [];
    }
    // Add the current arrival data to the corresponding statnFid entry
    trainsListOrdered[statnFid].push(arrival);
  });

  // Wait for all promises to resolve before returning the ordered trains
  await Promise.all(promises);

  return trainsListOrdered;
};

export default async function LinesPage({
  params,
}: {
  params: { stationId: string; lineId: string };
}) {
  const station = await serverClient.getStation({
    stationId: params.stationId,
  });
  if (!station) {
    return <>404</>;
  }

  const latestData = await getSubwayInfo({ stationName: station.stationName });
  // Filter the realtimeArrivalList to only keep the trains for the selected line
  const realtimeArrival = latestData.realtimeArrivalList.filter(
    (arrival) => arrival.subwayId === params.lineId
  );

  const trainsListOrdered = await getOrderedTrains(realtimeArrival);

  return (
    <>
      {Object.entries(trainsListOrdered).map(([key, values]) => {
        // Group trains by trainLineNm and updnLine
        const groupedTrains = groupTrainsByLine(values);

        return (
          <div key={key}>
            {groupedTrains.map((group, index) => (
              <div key={`${key}_${index}`}>
                <SubwayCard key={`${key}_${index}`} data={group[0]} />
                {group.map((value) => {
                  return <SubwayView key={value.btrainNo} data={value} />;
                })}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

// Helper function to group trains by trainLineNm and updnLine
function groupTrainsByLine(trains: RealtimeArrivalItem[]) {
  const groupedTrains = [] as RealtimeArrivalItem[][];
  const groupsMap = new Map();

  trains.forEach((train) => {
    const key = `${train.trainLineNm}_${train.updnLine}`;
    if (!groupsMap.has(key)) {
      groupsMap.set(key, []);
    }
    groupsMap.get(key).push(train);
  });

  groupsMap.forEach((group) => {
    groupedTrains.push(group);
  });

  return groupedTrains;
}

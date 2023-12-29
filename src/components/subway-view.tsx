import { InfoIcon, Circle, RectangleHorizontal } from 'lucide-react';
import { RealtimeArrivalItem } from '@/types/api-subway-info';

const secondsToMinutesFormat = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes}min${secondsLeft}`;
};

// const calculateProgress = (barvlDt: string) => {
//   const arrivalTime = parseInt(barvlDt);
//   // Assuming some logic here to calculate the progress based on arrival time and total travel time
//   const totalTravelTime = 600; // Example: Total travel time in seconds
//   const progress = (arrivalTime / totalTravelTime) * 100;
//   return progress;
// };

const SubwayView = ({
  statnFname, // previous station name
  statnName, // current station name
  barvlDt, // estimated arrival time in seconds
  arvlMsg2, // first arrival message (arrival, departure, entering, etc.)
  arvlMsg3, // second train arrival message (12 minutes later (Gwangmyeong Intersection))
  btTrainNo, // train number
}: {
  statnFname: RealtimeArrivalItem['statnFid'];
  statnName: RealtimeArrivalItem['statnId'];
  barvlDt: RealtimeArrivalItem['barvlDt'];
  arvlMsg2: RealtimeArrivalItem['arvlMsg2'];
  arvlMsg3: RealtimeArrivalItem['arvlMsg3'];
  btTrainNo: RealtimeArrivalItem['btrainNo'];
}) => {
  return (
    <>
      <div className="flex justify-between items-center p-6 gap-6 relative">
        <div className="flex flex-col gap-1 items-center">
          <Circle className="h-4 w-4 fill-black" />
          <span>{statnFname}</span>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <Circle className="h-4 w-4 fill-black" />
          <span>{statnName}</span>
        </div>
        <div className="absolute left-0 -top-4" id="trainLocation">
          <div className="relative h-12 w-12">
            <RectangleHorizontal className="absolute h-12 w-12 stroke-lime-500" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold">
              {btTrainNo}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 p-6">
        <span>
          {arvlMsg2} : {secondsToMinutesFormat(parseInt(barvlDt))}
        </span>
        <span>{arvlMsg3}</span>
      </div>
    </>
  );
};

export default SubwayView;

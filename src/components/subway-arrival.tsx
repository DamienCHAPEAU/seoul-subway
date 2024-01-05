import { Circle, RectangleHorizontal } from 'lucide-react';
import { RealtimeArrivalItem } from '@/types/api-subway-info';

const secondsToMinutesFormat = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes}min${secondsLeft}`;
};

const SubwayView = ({ data }: { data: RealtimeArrivalItem }) => {
  const showTrainLocation = data.statnFNm === data.arvlMsg3;
  return (
    <>
      <div className="flex justify-between items-center p-6 gap-6 relative">
        <div className="flex flex-col gap-1 items-center">
          <Circle className="h-4 w-4 fill-black" />
          <span>{data.statnFNm}</span>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <Circle className="h-4 w-4 fill-black" />
          <span>{data.statnNm}</span>
        </div>
        {showTrainLocation && (
          <div className="absolute left-0 -top-4" id="trainLocation">
            <div className="relative h-12 w-12">
              <RectangleHorizontal className="absolute h-12 w-12 stroke-lime-500" />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold">
                {data.btrainNo}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-2 p-6">
        <span>
          {data.arvlMsg2} : {secondsToMinutesFormat(parseInt(data.barvlDt))}
        </span>
        <span>Latest station : {data.arvlMsg3}</span>
      </div>
    </>
  );
};

export default SubwayView;

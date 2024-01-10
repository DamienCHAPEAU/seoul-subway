import { Circle, RectangleHorizontal } from 'lucide-react';
import { RealtimeArrivalItem } from '@/types/api-subway-info';

const secondsToMinutesFormat = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes}min${secondsLeft}`;
};

const getTrainLocation = ({
  arvlMsg2,
  statnNm,
}: Partial<RealtimeArrivalItem>) => {
  switch (arvlMsg2) {
    case `${statnNm} 진입`:
      return 'right-10';
    case `${statnNm} 도착`:
      return 'right-5';
    case statnNm:
      return 'right-5';
    case `${statnNm} 출발`:
      return 'right-0';
    case '전역 진입':
      return 'left-0';
    case '전역 도착':
      return 'left-5';
    case '전역 출발':
      return 'left-10';
    default:
      return '';
  }
};

const SubwayView = ({ data }: { data: RealtimeArrivalItem }) => {
  const trainLocation = getTrainLocation(data);
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
        {trainLocation !== '' && (
          <div
            id="trainLocation"
            className={`absolute -top-4 ${trainLocation}`}
          >
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

import { CardTitle, CardHeader, Card } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { InfoIcon } from 'lucide-react';
import { RealtimeArrivalItem } from '@/types/api-subway-info';

const SubwayCard = ({
  data: { trainLineNm, updnLine, recptnDt },
}: {
  data: RealtimeArrivalItem;
}) => {
  return (
    <>
      <div className="flex max-lg:flex-col justify-center items-center p-6 gap-6">
        <Card className="w-full max-w-md min-h-28">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex flex-col gap-1">
              <span>{trainLineNm}</span>
              <span>{updnLine}</span>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-md min-h-28">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex flex-col gap-1">
              <span>Last Update</span>
              <span>{recptnDt}</span>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default SubwayCard;

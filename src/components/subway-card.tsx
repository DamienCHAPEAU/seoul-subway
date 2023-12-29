import { CardTitle, CardHeader, Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InfoIcon } from 'lucide-react';
import { RealtimeArrivalItem } from '@/types/api-subway-info';

const SubwayCard = ({
  data: { trainLineNm, updnLine, recptnDt },
}: {
  data: RealtimeArrivalItem;
}) => {
  return (
    <>
      <div className="flex justify-center items-center p-6 gap-6">
        <Card className="w-full max-w-md h-28">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex flex-col gap-1">
              <span>{trainLineNm}</span>
              <span>{updnLine}</span>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-md h-28">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{recptnDt}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <aside className="fixed bottom-0 right-0 m-6">
        <Badge className="items-center" variant="outline">
          <InfoIcon className="h-3.5 w-3.5 -translate-x-1" />
          Last updated ? sec ago
        </Badge>
      </aside>
    </>
  );
};

export default SubwayCard;

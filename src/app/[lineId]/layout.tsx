import { ComboboxSubwayStations } from '@/components/select-subway';
import { serverClient } from '../_trpc/serverClient';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lineId: string };
}) {
  const lineId = parseInt(params.lineId);
  const stations = await serverClient.getStations({
    lineId: lineId,
  });
  return (
    <>
      <ComboboxSubwayStations stations={stations} />
      {children}
    </>
  );
}

import { ComboboxSubwayStations } from '@/components/select-subway';
import { serverClient } from '../_trpc/serverClient';

// This function will be called at build time to generate the list of paths
export async function generateStaticParams() {
  const lines = await serverClient.getLines();
  return lines.map((line) => ({
    lineId: line.lineId.toString(),
  }));
}

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

import { z } from 'zod';
import { procedure, router } from './trpc';
import { seoulSubwayData } from '@/lib/seoul-subway';
import { seoulLinesData } from '@/lib/seoul-lines';

export const appRouter = router({
  getLines: procedure.query(async () => {
    return seoulLinesData;
  }),
  getLine: procedure
    .input(
      z.object({
        lineId: z.number(),
      })
    )
    .query(async ({ input: { lineId } }) => {
      return seoulLinesData.find((data) => data.lineId === lineId)!;
    }),
  getStations: procedure
    .input(
      z.object({
        lineId: z.number(),
      })
    )
    .query(async ({ input: { lineId } }) => {
      return seoulSubwayData.filter((data) => data.lineId === lineId);
    }),
  getStation: procedure
    .input(
      z.object({
        stationId: z.string(),
      })
    )
    .query(async ({ input: { stationId } }) => {
      return seoulSubwayData.find(
        (data) => data.stationId === parseInt(stationId)
      )!;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

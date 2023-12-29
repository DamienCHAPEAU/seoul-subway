import { z } from 'zod';
import { procedure, router } from './trpc';
import { seoulSubwayData } from '@/lib/seoul-subway';

export const appRouter = router({
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
        stationId: z.number(),
      })
    )
    .query(async ({ input: { stationId } }) => {
      return seoulSubwayData.find((data) => data.stationId === stationId);
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

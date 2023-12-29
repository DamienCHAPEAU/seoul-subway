'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { RouterOutput } from '@/app/_trpc/client';

export const ComboboxSubwayLines = ({
  lines,
}: {
  lines: RouterOutput['getLines'];
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useRouter();
  const path = usePathname();
  const [lineId, setLineId] = useState(() => {
    const lineId = path.split('/')[1];
    if (!lineId) return null;
    return lineId;
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between mr-4"
        >
          {lineId
            ? lines.find((line) => line.lineId.toString() === lineId)?.lineName
            : 'Select Line...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search lines..." />
          <CommandEmpty>No line found.</CommandEmpty>
          <CommandGroup className="overflow-y-auto max-h-[300px]">
            {lines.map((line) => (
              <CommandItem
                key={line.lineId.toString()}
                value={line.lineName}
                onSelect={(currentValue) => {
                  if (currentValue === lineId) return;
                  const selectedLineId =
                    lines
                      .find((line) => line.lineName === currentValue)
                      ?.lineId.toString() ?? '';
                  setLineId(selectedLineId);
                  navigate.push(`/${selectedLineId}`);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    lineId === line.lineId.toString()
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {line.lineName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const ComboboxSubwayStations = ({
  stations,
}: {
  stations: RouterOutput['getStations'];
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useRouter();
  const path = usePathname();
  const [stationValue, setStationValue] = useState(() => {
    const stationId = path.split('/')[2];
    if (!stationId) return null;
    return stationId;
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {stationValue
            ? stations.find(
                (station) => station.stationId.toString() === stationValue
              )?.stationName
            : 'Select Station...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search stations..." />
          <CommandEmpty>No station found.</CommandEmpty>
          <CommandGroup className="overflow-y-auto max-h-[300px]">
            {stations.map((station) => (
              <CommandItem
                key={station.stationId.toString()}
                value={station.stationName}
                onSelect={(currentValue) => {
                  if (currentValue === stationValue) return;
                  const selectedStationId =
                    stations
                      .find((station) => station.stationName === currentValue)
                      ?.stationId.toString() ?? '';
                  setStationValue(selectedStationId);
                  navigate.replace(
                    `/${path.split('/')[1]}/${selectedStationId}`
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    stationValue === station.stationId.toString()
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {station.stationName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

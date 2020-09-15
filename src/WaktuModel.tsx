
export interface Waktu {
  type: WaktuType;
  id: string;
  name: string;
  timestamp: number;
}

export type WaktuType = 'solat' | 'iqamah' | 'imsak' | 'syuruk';

const initializeWaktuSolatData = () : Waktu[] => {
  const currentTimestamp = new Date().getTime();
  return [
    {
      type: 'imsak',
      id: 'imsak',
      name: 'Imsak',
      timestamp: currentTimestamp,
    },
    {
      type: 'solat',
      id: 'subuh',
      name: 'Subuh',
      timestamp: currentTimestamp,
    },
    {
      type: 'syuruk',
      id: 'syuruk',
      name: 'Syuruk',
      timestamp: currentTimestamp,
    },
    {
      type: 'solat',
      id: 'zohor',
      name: 'Zohor',
      timestamp: currentTimestamp,
    },
    {
      type: 'solat',
      id: 'asar',
      name: 'Asar',
      timestamp: currentTimestamp,
    },
    {
      type: 'solat',
      id: 'maghrib',
      name: 'Maghrib',
      timestamp: currentTimestamp,
    },
    {
      type: 'solat',
      id: 'isyak',
      name: 'Isyak',
      timestamp: currentTimestamp,
    },
    {
      type: 'solat',
      id: 'subuh_tomorrow',
      name: 'Subuh Esok',
      timestamp: currentTimestamp,
    },
  ];
};

/**
 *
 * @param allWaktuSolat
 * @return iqamah for every solat
 */
const initializeWaktuIqamahData = (allWaktuSolat: Waktu[]) : Waktu[] => {
  const tenMinutesInSeconds = 10 * 60;
  return allWaktuSolat
    .filter((waktu) => waktu.type === 'solat')
    .map((waktu) => ({
      ...waktu, timestamp: waktu.timestamp + tenMinutesInSeconds, name: `Iqamah ${waktu.name}`, type: 'iqamah',
    }));
};

export {
  initializeWaktuSolatData,
  initializeWaktuIqamahData,
};

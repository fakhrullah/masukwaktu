/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import UrlParse from 'url-parse';
import { addDays, format as dateFormat } from 'date-fns';
import {
  getNextSolatName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logCurrentCountdown,
  getAmPm,
} from './utils/helpers';
import { WaktuSolatDiv } from './WaktuSolatDiv';
import { SettingButton } from './SettingButton';
import {
  NextSolatAndLocation, SameZone,
  TextOfIqamahAndCurrentSolat, TextOfNextSolat,
} from './NextSolatAndLocation';
import { SponsorText } from './SponsorText';
import Header from './Header';
import zonesAndSameZones from './data/zones-and-same-zones.json';
import { useInterval } from './use-interval-hook';
import AboutModal from './AboutModal';
import SettingSidebarModal from './SettingSidebarModal';
import Countdown from './Countdown';
import ChooseLocationModal from './ChooseLocationModal';
import { ZoneLocationInterface, LOADING } from './interfaces';
import { Waktu, initializeWaktuSolatData, initializeWaktuIqamahData } from './WaktuModel';
import { initializeLocation, LocationDetail } from './LocationModel';
import { Analytics } from './Analytics';

const apiURL: string = 'https://solatapi.fajarhac.com';
// const apiURL: string = 'http://localhost:4000';
const youtubeVideoId: string = 'PFd8dbaxQc4';

const initialWaktuSolatDanIqamahToday: Array<Waktu> = initializeWaktuSolatData();

const initialLocation: LocationDetail = initializeLocation();

const initialStateHideSameZoneDesc: boolean = !!localStorage.getItem('hide-same-zone-desc');
const initialStateHideSponsorFooter: boolean = !!localStorage.getItem('hide-sponsor-footer');

ReactModal.setAppElement('#root');

function App() {
  const [nextSolat, setNextSolat] = useState<string>('subuh');
  const [currentWaktuIndex, setCurrentWaktuIndex] = useState<number>(0);

  const [countdownHour, setCountdownHour] = useState<number>(0);
  const [countdownMinutes, setCountdownMinutes] = useState<number>(0);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(0);

  const [waktuSolatToday, setWaktuSolatToday] = useState<Waktu[]>(initialWaktuSolatDanIqamahToday);
  const [location, setLocation] = useState<LocationDetail>(initialLocation);
  const [isLoading, setIsLoading] = useState<LOADING>(LOADING.START);

  // modal states
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSettingSidebarModal, setShowSettingSidebarModal] = useState(false);

  // show azan
  const [showAzan, setShowAzan] = useState(false);

  // configutarions
  const [hideSameZoneDesc, setHideSameZoneDesc] = useState(initialStateHideSameZoneDesc);
  const [hideSponsorFooter, setHideSponsorFooter] = useState(initialStateHideSponsorFooter);

  function calculateCountdown(waktuIndex: number) {
    const current = new Date();
    const currentTime = current.getTime();

    const allWaktu = waktuSolatToday;
    const currentWaktu = allWaktu[waktuIndex];
    const currentWaktuTime = currentWaktu.timestamp;
    const nextWaktu = getNextSolat(waktuIndex);
    const nextWaktuTime = nextWaktu.timestamp;
    // const countdownInSeconds = nextWaktuTime - (currentTime / 1000);
    const countdownInSeconds = (nextWaktuTime - currentTime) / 1000;
    // console.log(nextWaktuTime, ' ---  ', currentTime);
    // console.log(nextWaktuTime - currentTime);

    // Change to next solat
    if (countdownInSeconds <= 0) {
      setIsLoading(LOADING.PROGRESS);
      setNextSolat(getNextSolatName(nextSolat));
      setCurrentWaktuIndex(waktuIndex + 1);
    } else {
      setIsLoading(LOADING.DONE);
    }

    // Display azan video when azan is just in 3 minutes
    const timeElapsedFromLastSolat: number = (currentTime / 1000) - currentWaktuTime;
    if (
      isLoading === LOADING.DONE
      && timeElapsedFromLastSolat <= (3 * 60)
    ) {
      // if (nextSolat.toLowerCase() !== 'imsak' || nextSolat.toLowerCase() !== 'syuruk') {
      if (currentWaktu.type === 'solat') {
        // setShowAzan(true);
        // setTimeout(() => {
        //   setShowAzan(false);
        // }, 5 * 60 * 1000);
        console.log('#---- Show Azan #');
      }
    }

    setCountdownHour(Math.floor(countdownInSeconds / 3600));
    setCountdownMinutes(Math.floor((countdownInSeconds % 3600) / 60));
    setCountdownSeconds(Math.floor(countdownInSeconds % 60));
    // logCurrentCountdown(countdownHour, countdownMinutes, countdownSeconds);
  }

  useInterval(() => {
    calculateCountdown(currentWaktuIndex);
  }, 1000);

  // Request solat time from API, then set the time
  useEffect(() => {
    setIsLoading(LOADING.PROGRESS);
    const url = UrlParse(window.location.href);
    const locationInUrl = url.pathname.split('/')[1];
    // console.log(`====> ${locationInUrl}`);
    let locationZone = location.zone;

    if (locationInUrl !== '') {
      // console.log(locationInUrl);
      const foundZone = zonesAndSameZones.zones.find((checkZone) => checkZone.id === locationInUrl);
      if (typeof foundZone !== 'undefined') {
        const {
          id, lokasi, negeri, zone, othersInSameZone,
        } = foundZone;
        locationZone = zone;
        setLocation({
          id, name: lokasi, state: negeri, zone, othersInSameZone,
        });
      }
    }

    const today = new Date();
    const tomorrow = addDays(today, 1);
    const from = dateFormat(today, 'dd-MM-yyyy');
    const to = dateFormat(tomorrow, 'dd-MM-yyyy');
    const getSolatTodayAndTomorrowUrl: string = `${apiURL}/times?zone=${locationZone}&from=${from}&to=${to}`;

    fetch(getSolatTodayAndTomorrowUrl)
      .then((response) => {
        const data = response.json();
        // console.log(data);
        return data;
      })
      .then((data: { status: string, results?: object[], message?: string }) => {
        if (data.status === 'failed') throw new Error(data.message || 'Error api');
        if (!data.results) {
          throw new Error('Data not found');
        } else {
          return [data.results[0], data.results[1]];
        }
      })
      .then(([todayPrayerTimes, tomorrowPrayerTimes]) => {
        // @ts-ignore:next-line
        const subuhTomorrow = tomorrowPrayerTimes.subuh;

        const allPrayerTimes = { ...todayPrayerTimes, subuh_tomorrow: subuhTomorrow };

        // console.log(allPrayerTimes);

        // Combined today solat and tomorrow Subuh
        const updatedSolatTimes: Waktu[] = initialWaktuSolatDanIqamahToday
          // @ts-ignore:next-line
          .map(({ timestamp, id, ...waktu }) => ({ ...waktu, id, timestamp: allPrayerTimes[id] }));

        // Combined with iqamah times
        const updatedSolatAndIqamahTimes = updatedSolatTimes
          .concat(getIqamahTimes(updatedSolatTimes))
          .sort((waktuA, waktuB) => waktuA.timestamp - waktuB.timestamp);

        // set current waktu based on current time
        const now : Waktu = {
          id: 'now',
          name: 'now',
          type: 'now',
          timestamp: new Date().getTime(),
        };
        const sortedSolatAndIqamahTimesAndNowTime: Waktu[] = updatedSolatAndIqamahTimes
          .concat(now)
          .sort((waktuA, waktuB) => waktuA.timestamp - waktuB.timestamp);

        console.log(sortedSolatAndIqamahTimesAndNowTime);

        const nowIndex = sortedSolatAndIqamahTimesAndNowTime
          .findIndex((waktu) => waktu.id === 'now');
        const countedCurrentWaktuIndex = nowIndex === 0
          ? updatedSolatAndIqamahTimes.length - 1
          : nowIndex - 1;

        setWaktuSolatToday(updatedSolatAndIqamahTimes);
        setCurrentWaktuIndex(countedCurrentWaktuIndex);

        // console.log(tomorrowPrayerTimes);
        setIsLoading(LOADING.DONE);
      })
      .catch((err) => { console.log(err); });

    return () => {
    };
  }, [location.zone]);

  function getIqamahTimes(allSolatTimesData: Waktu[]): Waktu[] {
    // get from config - show iqamah or not
    // const showIqamah: boolean = true;

    // inject iqamah data for every solat
    const iqamahTimes: Waktu[] = initializeWaktuIqamahData(allSolatTimesData);

    return iqamahTimes;
  }

  function getNextSolat(currentWaktuSolatIndex : number) : Waktu {
    return currentWaktuSolatIndex === waktuSolatToday.length - 1
      ? waktuSolatToday[0]
      : waktuSolatToday[currentWaktuSolatIndex + 1];
  }
  const chooseLocation = () => {
    console.info('SHOW Modal to choose location');
    setShowLocationModal(true);
  };

  const changeLocation = (zone: ZoneLocationInterface) => {
    const url = UrlParse(window.location.href);
    url.set('pathname', `/${zone.id}`);
    // window.location.href = url.href;
    window.history.replaceState('', '', `${url.href}`);
    Analytics.changeLocationEvent(zone.lokasi);
    setLocation({
      id: zone.id,
      name: zone.lokasi,
      state: zone.negeri,
      zone: zone.zone,
      othersInSameZone: zone.othersInSameZone,
    });
    setShowLocationModal(false);
  };

  const showSponsorModal = () => {
    console.group('sponsor-modal');
    console.info('SHOW Sponsor Modal');
    console.groupEnd();

    setShowAboutModal(true);
  };

  return (
    <div className="App">
      <Header />
      <SettingButton onClick={() => setShowSettingSidebarModal(true)} />

      <div className={showAzan ? 'shrink' : ''}>
        <Countdown countdown={
          isLoading === LOADING.DONE
            ? [countdownHour, countdownMinutes, countdownSeconds]
            : [0, 0, 0]
          }
        />

        <NextSolatAndLocation>
          {
            getNextSolat(currentWaktuIndex).type === 'iqamah'
              ? <TextOfIqamahAndCurrentSolat
                currentWaktuSolatName={waktuSolatToday[currentWaktuIndex].name}
                currentWaktuName={getNextSolat(currentWaktuIndex).name}
                locationName={location.name}
                chooseLocation={chooseLocation}
              />
              : <TextOfNextSolat
                nextWaktuSolatName={getNextSolat(currentWaktuIndex).name}
                locationName={location.name}
                chooseLocation={chooseLocation}
              />
            }
          <SameZone
            othersLocationInSameZone={location.othersInSameZone}
            hideSameZoneDesc={hideSameZoneDesc}
          />
        </NextSolatAndLocation>
      </div>

      <div style={{ width: '100%', textAlign: 'center' }}>
        {
          showAzan
          && <iframe
            style={{ width: '100%', maxWidth: '560px' }}
            title="azan video"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        }
      </div>

      <footer style={{ position: 'fixed', bottom: '0' }}>
        <div style={{ display: 'flex' }}>
          {
            waktuSolatToday
              .filter(((waktu) => waktu.type === 'solat' || waktu.type === 'syuruk'))
              .map((waktu, index) => (
                <WaktuSolatDiv
                  key={waktu.id}
                  name={waktu.name.toUpperCase()}
                  isActive={waktuSolatToday[currentWaktuIndex].id === waktu.id}
                  time={isLoading === LOADING.DONE
                    ? dateFormat(waktu.timestamp, 'K:mm')
                    : '--:--'}
                  ampm={isLoading === LOADING.DONE ? getAmPm(waktu.timestamp) : ''}
                />
              ))
          }
        </div>
        {
        hideSponsorFooter
        || <SponsorText onClick={showSponsorModal} />
        }
      </footer>
      <AboutModal
        isOpen={showAboutModal}
        onRequestClose={() => setShowAboutModal(false)}
      />
      <SettingSidebarModal
        setHideSponsorFooter={setHideSponsorFooter}
        setHideSameZoneDesc={setHideSameZoneDesc}
        isOpen={showSettingSidebarModal}
        onRequestClose={() => setShowSettingSidebarModal(false)}
      />
      <ChooseLocationModal
        isOpen={showLocationModal}
        onRequestClose={() => setShowLocationModal(false)}
        changeLocation={changeLocation}
      />
    </div>
  );
}

export default App;

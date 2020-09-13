/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import UrlParse from 'url-parse';
import ReactGA from 'react-ga';

import {
  convertTimestampToHumanTime,
  getNextSolatName,
  getCurrentSolatName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logCurrentCountdown,
} from './utils/helpers';
import { WaktuSolatDiv } from './WaktuSolatDiv';
import { SettingButton } from './SettingButton';
import {
  NextSolatAndLocation, SameZone, NextSolat,
  SolatLocation, ChangeLocationButton,
} from './NextSolatAndLocation';
import { SponsorText } from './SponsorText';
import Header from './Header';
import zonesAndSameZones from './data/zones-and-same-zones.json';
import { useInterval } from './use-interval-hook';
import AboutModal from './AboutModal';
import SettingSidebarModal from './SettingSidebarModal';
import Countdown from './Countdown';
import ChooseLocationModal from './ChooseLocationModal';
import { ZoneLocationInterface, LOADING, LocationDetail } from './interfaces';

const apiURL = 'https://solatapi.fajarhac.com';
const youtubeVideoId = 'PFd8dbaxQc4';

const currentTimestamp: number = (new Date()).getTime();

interface Waktu {
  type: string;
  id: string;
  name: string;
  timestamp: number;
}

const initialWaktuSolatDanIqamahToday: Array<Waktu> = [
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

const initialLocation: LocationDetail = {
  id: 'kuala-lumpur_wilayah',
  name: 'Kuala Lumpur',
  state: 'Wilayah',
  zone: 'wly01',
  othersInSameZone: ['PUTRAJAYA', 'KUALA LUMPUR'],
};

const initialStateHideSameZoneDesc: boolean = !!localStorage.getItem('hide-same-zone-desc');
const initialStateHideSponsorFooter: boolean = !!localStorage.getItem('hide-sponsor-footer');

ReactModal.setAppElement('#root');

function App() {
  const [seconds, setSeconds] = useState(0);
  const [nextSolat, setNextSolat] = useState('subuh');

  const [countdownHour, setCountdownHour] = useState(0);
  const [countdownMinutes, setCountdownMinutes] = useState(0);
  const [countdownSeconds, setCountdownSeconds] = useState(0);

  const [waktuSolatToday, setWaktuSolatToday] = useState(initialWaktuSolatDanIqamahToday);
  const [location, setLocation] = useState(initialLocation);
  const [isLoading, setIsLoading] = useState(LOADING.START);

  // modal states
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSettingSidebarModal, setShowSettingSidebarModal] = useState(false);

  // show azan
  const [showAzan, setShowAzan] = useState(false);

  // configutarions
  const [hideSameZoneDesc, setHideSameZoneDesc] = useState(initialStateHideSameZoneDesc);
  const [hideSponsorFooter, setHideSponsorFooter] = useState(initialStateHideSponsorFooter);

  function calculateCountdown(nextSolatName: string) {
    const current = new Date();
    // console.log(current.getTime());
    const nextSolatData = waktuSolatToday.findIndex((waktu) => waktu.id === nextSolatName);
    const nextSolatTime = waktuSolatToday.filter((waktu) => waktu.id === nextSolatName)[0]?.timestamp;
    const countdownInSeconds = ((nextSolatTime * 1000) - current.getTime()) / 1000;
    const currentSolatTime = waktuSolatToday[nextSolatData - 1].timestamp;

    // Change to next solat
    if (countdownInSeconds <= 0) {
      setNextSolat(getNextSolatName(nextSolat));
      setIsLoading(LOADING.PROGRESS);
    } else {
      setIsLoading(LOADING.DONE);
    }

    // Display azan video when azan is just in 3 minutes
    if (
      isLoading === LOADING.DONE
      && (current.getTime() - (currentSolatTime * 1000)) / 1000 <= (3 * 60)
    ) {
      if (nextSolat.toLowerCase() !== 'imsak' || nextSolat.toLowerCase() !== 'syuruk') {
        setShowAzan(true);
        setTimeout(() => {
          setShowAzan(false);
        }, 5 * 60 * 1000);
      }
    }

    setCountdownHour(Math.floor(countdownInSeconds / 3600));
    setCountdownMinutes(Math.floor((countdownInSeconds % 3600) / 60));
    setCountdownSeconds(Math.floor(countdownInSeconds % 60));
    // logCurrentCountdown(countdownHour, countdownMinutes, countdownSeconds);
  }

  useInterval(() => {
    if (seconds >= 59) {
      setSeconds(0);
    } else {
      setSeconds(seconds + 1);
    }
    calculateCountdown(nextSolat);
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

    fetch(`${apiURL}/times/today.json?zone=${locationZone}`)
      .then((response) => response.json())
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { date, ...prayerTimes } = data.prayer_times;
        // setWaktuSolatToday({
        //   ...prayerTimes,
        // });
        console.log(data);
        return prayerTimes;
      })
      .then((prayerTimes) => Promise.all([prayerTimes, fetch(`${apiURL}/times/tomorrow.json?zone=${locationZone}`)]))
      .then(([todayPrayerTimes, tomorrowPrayerTimesResponse]) => Promise.all([todayPrayerTimes, tomorrowPrayerTimesResponse.json()]))
      .then(([todayPrayerTimes, tomorrowPrayerTimes]) => {
        const subuhTomorrow = tomorrowPrayerTimes.prayer_times.subuh;
        const allPrayerTimes = { ...todayPrayerTimes, subuh_tomorrow: subuhTomorrow };
        const updatedSolatAndIqamahTimes = initialWaktuSolatDanIqamahToday
          .map(({ timestamp, id, ...waktu }) => ({ ...waktu, id, timestamp: allPrayerTimes[id] }));
        setWaktuSolatToday(updatedSolatAndIqamahTimes);
        // console.log(tomorrowPrayerTimes);
        setIsLoading(LOADING.DONE);
      })
      .catch((err) => { console.log(err); });

    return () => {
    };
  }, [location.zone]);

  const chooseLocation = () => {
    console.info('SHOW Modal to choose location');

    setShowLocationModal(true);
  };

  const changeLocation = (zone: ZoneLocationInterface) => {
    const url = UrlParse(window.location.href);
    url.set('pathname', `/${zone.id}`);
    // window.location.href = url.href;
    window.history.replaceState('', '', `${url.href}`);
    ReactGA.event({
      category: 'Location',
      action: 'Change Location',
      label: zone.lokasi,
    });
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
          <div>
            Sebelum Masuk Waktu
            {' '}
            <NextSolat name={nextSolat} />
            {' '}
            di
            {' '}
            <SolatLocation name={location.name} onClick={chooseLocation} />
            <ChangeLocationButton onClick={chooseLocation} />
          </div>
          <SameZone othersLocationInSameZone={location.othersInSameZone} hideSameZoneDesc={hideSameZoneDesc} />
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
              .map((waktu) => (
                <WaktuSolatDiv
                  key={waktu.id}
                  name={waktu.name.toUpperCase()}
                  time={isLoading === LOADING.DONE
                    ? convertTimestampToHumanTime(waktu.timestamp)
                    : '--:--'}
                  ampm="am"
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

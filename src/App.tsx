/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import UrlParse from 'url-parse';
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

const apiURL = 'https://solatapi.fajarhac.com';

enum LOADING {
  START,
  PROGRESS,
  DONE
}

interface MyType {
  [key: string]: number;
}

const currentTimestamp: number = (new Date()).getTime();

const initialWaktuSolatToday: MyType = {
  datestamp: currentTimestamp,
  imsak: currentTimestamp,
  subuh: currentTimestamp,
  syuruk: currentTimestamp,
  zohor: currentTimestamp,
  asar: currentTimestamp,
  maghrib: currentTimestamp,
  isyak: currentTimestamp,
  subuh_tomorrow: currentTimestamp,
};

interface LocationDetail {
  id: string;
  name: string;
  state: string;
  zone: string;
  othersInSameZone: Array<string>;
}

const initialLocation: LocationDetail = {
  id: 'kuala-lumpur_wilayah',
  name: 'Kuala Lumpur',
  state: 'Wilayah',
  zone: 'wly01',
  othersInSameZone: ['PUTRAJAYA', 'KUALA LUMPUR'],
};

ReactModal.setAppElement('#root');

function App() {
  const [seconds, setSeconds] = useState(0);
  const [nextSolat, setNextSolat] = useState('subuh');

  const [countdownHour, setCountdownHour] = useState(0);
  const [countdownMinutes, setCountdownMinutes] = useState(0);
  const [countdownSeconds, setCountdownSeconds] = useState(0);

  const [waktuSolatToday, setWaktuSolatToday] = useState(initialWaktuSolatToday);
  const [location, setLocation] = useState(initialLocation);
  const [isLoading, setIsLoading] = useState(LOADING.START);

  // modal states
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSettingSidebarModal, setShowSettingSidebarModal] = useState(false);

  // show azan
  const [showAzan, setShowAzan] = useState(false);

  function calculateCountdown(nextSolatName: string) {
    const current = new Date();
    // console.log(current.getTime());
    const nextSolatTime = waktuSolatToday[nextSolatName];
    const countdownInSeconds = ((nextSolatTime * 1000) - current.getTime()) / 1000;
    const currentSolatTime = waktuSolatToday[getCurrentSolatName(nextSolatName)];

    // change to next solat
    if (countdownInSeconds <= 0) {
      setNextSolat(getNextSolatName(nextSolat));
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

  // request solat time from API, then set the time
  useEffect(() => {
    setIsLoading(LOADING.PROGRESS);
    const url = UrlParse(window.location.href);
    const locationInUrl = url.pathname.split('/')[1];
    // console.log(`====> ${locationInUrl}`);

    if (locationInUrl !== '') {
      // console.log(locationInUrl);
      const foundZone = zonesAndSameZones.zones.find((checkZone) => checkZone.id === locationInUrl);
      if (typeof foundZone !== 'undefined') {
        const {
          id, lokasi, negeri, zone, othersInSameZone,
        } = foundZone;
        setLocation({
          id, name: lokasi, state: negeri, zone, othersInSameZone,
        });
      }
    }

    fetch(`${apiURL}/times/today.json?zone=${location.zone}`)
      .then((response) => response.json())
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { date, ...prayerTimes } = data.prayer_times;
        setWaktuSolatToday({
          ...prayerTimes,
        });
        console.log(data);
        return prayerTimes;
      })
      .then((prayerTimes) => Promise.all([prayerTimes, fetch(`${apiURL}/times/tomorrow.json?zone=${location.zone}`)]))
      .then(([todayPrayerTimes, tomorrowPrayerTimesResponse]) => Promise.all([todayPrayerTimes, tomorrowPrayerTimesResponse.json()]))
      .then(([todayPrayerTimes, tomorrowPrayerTimes]) => {
        const subuhTomorrow = tomorrowPrayerTimes.prayer_times.subuh;
        setWaktuSolatToday({
          ...todayPrayerTimes,
          subuh_tomorrow: subuhTomorrow,
        });
        setIsLoading(LOADING.DONE);
      });
    return () => {
    };
  }, [location.zone]);

  useEffect(() => {
    const currentTimestampInSeconds = Math.floor((new Date()).getTime() / 1000);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { imsak, datestamp, ...tempWaktuSolatToday } = waktuSolatToday;
    tempWaktuSolatToday.now = currentTimestampInSeconds;
    const timeArray = Object.entries(tempWaktuSolatToday);
    const sortedTimeArray = timeArray.sort(([keyA, valueA], [keyB, valueB]) => (valueA >= valueB ? 1 : -1));
    // console.log(sortedTimeArray);
    const indexOfNextSolat = sortedTimeArray.findIndex((solatTime) => solatTime.includes('now')) + 1;
    setNextSolat(sortedTimeArray[indexOfNextSolat][0]);
    // console.log(indexOfNextSolat);
  }, [waktuSolatToday, waktuSolatToday.imsak]);

  const chooseLocation = () => {
    console.group('modal-to-choose-place');
    console.info('SHOW Modal to choose location');
    console.table([['selangor', 'sgr01'], ['selangor', 'sgr02'], ['terengganu', 'setiu']]);
    console.groupEnd();

    setShowLocationModal(true);
  };

  interface ZoneLocationInterface {
    id: string,
    zone: string,
    lokasi: string,
    negeri: string,
    othersInSameZone: Array<string>,
  }

  const changeLocation = (zone: ZoneLocationInterface) => {
    const url = UrlParse(window.location.href);
    url.set('pathname', `/${zone.id}`);
    // window.location.href = url.href;
    window.history.replaceState('', '', `${url.href}`);
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
        <Countdown countdown={[countdownHour, countdownMinutes, countdownSeconds]} />

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
          <SameZone othersLocationInSameZone={location.othersInSameZone} />
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
            src="https://www.youtube.com/embed/mUHDYlJHaOQ?autoplay=1&mute=1"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        }
      </div>

      <footer style={{ position: 'fixed', bottom: '0' }}>
        <div style={{ display: 'flex' }}>
          {[
            'imsak',
            'subuh',
            'syuruk',
            'zohor',
            'asar',
            'maghrib',
            'isyak',
          ].map((solat) => (
            <WaktuSolatDiv
              key={solat}
              name={solat.toUpperCase()}
              time={isLoading === LOADING.DONE ? convertTimestampToHumanTime(waktuSolatToday[solat]) : '--:--'}
              ampm="am"
            />
          ))}
        </div>

        <SponsorText onClick={showSponsorModal} />
      </footer>
      <AboutModal
        isOpen={showAboutModal}
        onRequestClose={() => setShowAboutModal(false)}
      />
      <SettingSidebarModal
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

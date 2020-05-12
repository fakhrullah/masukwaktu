/* eslint-disable no-console */
import React, { useState, useEffect, useCallback } from 'react';
import { WaktuSolatDiv } from './WaktuSolatDiv';
import { SettingButton } from './SettingButton';
import {
  NextSolatAndLocation, SameZone, NextSolat,
  SolatLocation, ChangeLocationButton,
} from './NextSolatAndLocation';
import { SponsorText } from './SponsorText';
import Header from './Header';

interface MyType {
  [key: string]: string;
}

const initialWaktuSolatToday: MyType = {
  imsak: '00:00',
  subuh: '00:00',
  syuruk: '00:00',
  zohor: '00:00',
  asar: '00:00',
  maghrib: '00:00',
  isyak: '00:00',
};

const initialLocation = {
  id: 'kuala-lumpur_wilayah',
  name: 'Kuala Lumpur',
  state: 'Wilayah',
  zone: 'kl',
  othersInSameZone: ['PUTRAJAYA', 'KUALA LUMPUR'],
};

function App() {
  const [countdown, setCountdown] = useState('00:00:00');
  const [seconds, setSeconds] = useState(0);
  const [nextSolat, setNextSolat] = useState('subuh');

  const [countdownHour, setCountdownHour] = useState(0);
  const [countdownMinutes, setCountdownMinutes] = useState(0);
  const [countdownSeconds, setCountdownSeconds] = useState(0);

  const [waktuSolatToday, setWaktuSolatToday] = useState(initialWaktuSolatToday);
  const [location, setLocation] = useState(initialLocation);
  const [isLoading, setIsLoading] = useState('none');

  function convertWaktuSolatStringToDate(solatTime: string): Date {
    // console.log(solatTime);
    const [hour, minutes] = solatTime.split(':');
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hour, 10), parseInt(minutes, 10), 0);
  }

  function logCurrentCountdown() {
    console.log(`${countdownHour}:${countdownMinutes}:${countdownSeconds}`);
  }

  function displayCountdown(hour: number, minute: number, second: number) : string {
    const hourTwoDigits = hour >= 10 ? hour : `0${hour}`;
    const minuteTwoDigits = minute >= 10 ? minute : `0${minute}`;
    const secondTwoDigits = second >= 10 ? second : `0${second}`;
    return `${hourTwoDigits}:${minuteTwoDigits}:${secondTwoDigits}`;
  }

  function calculateCountdown(nextSolatName: string) {
    const current = new Date();
    // console.log(nextSolatName);
    const sol = waktuSolatToday[nextSolatName];
    const nextSolatTime = convertWaktuSolatStringToDate(sol);
    // nextTime - current time
    const countdownInSeconds = (nextSolatTime.getTime() - current.getTime()) / 1000;
    setCountdownHour(Math.floor(countdownInSeconds / 3600));
    setCountdownMinutes(Math.floor((countdownInSeconds % 3600) / 60));
    setCountdownSeconds(Math.floor(countdownInSeconds % 60));
    setCountdown(displayCountdown(countdownHour, countdownMinutes, countdownSeconds));
    logCurrentCountdown();
  }

  useEffect(() => {
    const counter = setInterval(() => {
      if (seconds >= 59) {
        setSeconds(0);
      } else {
        setSeconds(seconds + 1);
      }
      // const timeToNext = `00:05:${seconds < 10 ? `0${seconds}` : seconds}`;
      // setCountdown(timeToNext);
      // console.log(timeToNext)
      // logCurrentCountdown();
      calculateCountdown(nextSolat);
    }, 1000);
    return () => {
      clearInterval(counter);
    };
  }, [nextSolat, seconds]);

  useEffect(() => {
    // GET https://_____
    //
    setIsLoading('LOADING');
    setLocation({
      id: 'subang-jaya_selangor',
      name: 'Subang Jaya',
      state: 'Selangor',
      zone: 'SGHR01',
      othersInSameZone: ['SUBANG JAYA', 'PETALING JAYA', 'GOMBAK', 'HULU LANGAT', 'SEPANG',
        'HULU SELANGOR', 'SHAH ALAM'],
    });
    setWaktuSolatToday({
      imsak: '05:43',
      subuh: '05:53',
      syuruk: '07:02',
      zohor: '13:13',
      asar: '16:33',
      maghrib: '19:20',
      isyak: '20:31',
    });
    setIsLoading('DONE');

    setNextSolat('asar');


    return () => {};
  }, []);

  const chooseLocation = () => {
    console.group('modal-to-choose-place');
    console.info('SHOW Modal to choose location');
    console.table([['selangor', 'sghr01'], ['selangor', 'sghr02'], ['terengganu', 'setiu']]);
    console.groupEnd();
  };

  const showSponsorModal = () => {
    console.group('sponsor-modal');
    console.info('SHOW Sponsor Modal');
    console.groupEnd();
  };

  return (
    <div className="App">
      <Header />
      <SettingButton />

      {/* timer */}
      <div style={{ width: '100%', textAlign: 'center', position: 'relative' }}>
        <div style={{
          fontSize: '20vw',
          fontFamily: 'SquadaOne',
          margin: '32px 0 32px 0',
          letterSpacing: '0.1em',
          color: '#dfdfdf',
          position: 'absolute',
          top: '0',
          width: '100%',
          fontVariantNumeric: 'ordinal',
        }}
        >
          {countdown}
        </div>
        <div style={{
          fontSize: '20vw',
          fontFamily: 'SquadaOne',
          margin: '32px 0 32px 0',
          letterSpacing: '0.1em',
          clipPath: 'inset(100% 50% 100% 100%)',
          position: 'absolute',
          width: '100%',
          fontVariantNumeric: 'ordinal',
        }}
        >
          {countdown}
        </div>
        <div style={{
          fontSize: '20vw',
          fontFamily: 'SquadaOne',
          margin: '32px 0 16px 0',
          letterSpacing: '0.1em',
          visibility: 'hidden',
        }}
        >
          _
        </div>
      </div>

      <NextSolatAndLocation>
        <div>
          Sebelum Masuk Waktu
          {' '}
          <NextSolat name={nextSolat} />
          {' '}
          di
          {' '}
          <SolatLocation name={location.name} />
          <ChangeLocationButton onClick={chooseLocation} />
        </div>
        <SameZone othersLocationInSameZone={location.othersInSameZone} />
      </NextSolatAndLocation>

      <footer style={{ position: 'fixed', bottom: '0' }}>
        {isLoading === 'DONE'
        && (
        <div style={{ display: 'flex' }}>
          <WaktuSolatDiv name="IMSAK" time={waktuSolatToday.imsak} ampm="am" />
          <WaktuSolatDiv name="SUBUH" time={waktuSolatToday.subuh} ampm="am" />
          <WaktuSolatDiv name="SYURUK" time={waktuSolatToday.syuruk} ampm="am" />
          <WaktuSolatDiv name="ZOHOR" time={waktuSolatToday.zohor} ampm="pm" />
          <WaktuSolatDiv name="ASAR" time={waktuSolatToday.asar} ampm="pm" />
          <WaktuSolatDiv name="MAGHRIB" time={waktuSolatToday.maghrib} ampm="pm" />
          <WaktuSolatDiv name="ISYAK" time={waktuSolatToday.isyak} ampm="pm" />
        </div>
        )}

        <SponsorText onClick={showSponsorModal} />
      </footer>
    </div>
  );
}

export default App;

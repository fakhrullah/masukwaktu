/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { WaktuSolatDiv } from './WaktuSolatDiv';
import { SettingButton } from './SettingButton';
import {
  NextSolatAndLocation, SameZone, NextSolat,
  SolatLocation, ChangeLocationButton,
} from './NextSolatAndLocation';
import { SponsorText } from './SponsorText';
import Header from './Header';

interface MyType {
  [key: string]: number;
}

const initialWaktuSolatToday: MyType = {
  datestamp: 1589212800,
  imsak: 1589233260,
  subuh: 1589233860,
  syuruk: 1589238060,
  zohor: 1589260320,
  asar: 1589272440,
  maghrib: 1589282400,
  isyak: 1589286780,
  subuh_esok: 1589320200,
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

  function convertTimestampToHumanTime(timestamp: number): String {
    const time: Date = new Date(timestamp * 1000);
    const hour: number = time.getHours();
    const minute: number = time.getMinutes();
    const formattedHour: String = hour > 12 ? `${(hour - 12)}` : `${hour}`;
    const formattedMinute: String = minute < 10 ? `0${minute}` : `${minute}`;
    return `${formattedHour}:${formattedMinute}`;
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
    const nextSolatTime = waktuSolatToday[nextSolatName];
    const countdownInSeconds = ((nextSolatTime * 1000) - current.getTime()) / 1000;

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
      calculateCountdown(nextSolat);
    }, 1000);
    return () => {
      clearInterval(counter);
    };
  });

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
      datestamp: 1589212800,
      imsak: 1589233260,
      subuh: 1589233860,
      syuruk: 1589238060,
      zohor: 1589260320,
      asar: 1589272440,
      maghrib: 1589282400,
      isyak: 1589286780,
      subuh_esok: 1589320200,
    });
    setIsLoading('DONE');

    setNextSolat('maghrib');

    return () => {};
  }, [waktuSolatToday.imsak]);

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
          <WaktuSolatDiv name="IMSAK" time={convertTimestampToHumanTime(waktuSolatToday.imsak)} ampm="am" />
          <WaktuSolatDiv name="SUBUH" time={convertTimestampToHumanTime(waktuSolatToday.subuh)} ampm="am" />
          <WaktuSolatDiv name="SYURUK" time={convertTimestampToHumanTime(waktuSolatToday.syuruk)} ampm="am" />
          <WaktuSolatDiv name="ZOHOR" time={convertTimestampToHumanTime(waktuSolatToday.zohor)} ampm="pm" />
          <WaktuSolatDiv name="ASAR" time={convertTimestampToHumanTime(waktuSolatToday.asar)} ampm="pm" />
          <WaktuSolatDiv name="MAGHRIB" time={convertTimestampToHumanTime(waktuSolatToday.maghrib)} ampm="pm" />
          <WaktuSolatDiv name="ISYAK" time={convertTimestampToHumanTime(waktuSolatToday.isyak)} ampm="pm" />
        </div>
        )}

        <SponsorText onClick={showSponsorModal} />
      </footer>
    </div>
  );
}

export default App;

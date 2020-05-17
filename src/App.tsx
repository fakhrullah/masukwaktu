/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { WaktuSolatDiv } from './WaktuSolatDiv';
import { SettingButton } from './SettingButton';
import {
  NextSolatAndLocation, SameZone, NextSolat,
  SolatLocation, ChangeLocationButton,
} from './NextSolatAndLocation';
import { SponsorText } from './SponsorText';
import Header from './Header';
import groupedZones from './data/grouped-zones.json';
import groupedZonesByStates from './data/group-by-states.json';
import zones from './data/zones-and-same-zones.json';

interface MyType {
  [key: string]: number;
}

const currentTimstamp: number = (new Date()).getTime();

const initialWaktuSolatToday: MyType = {
  datestamp: currentTimstamp,
  imsak: currentTimstamp,
  subuh: currentTimstamp,
  syuruk: currentTimstamp,
  zohor: currentTimstamp,
  asar: currentTimstamp,
  maghrib: currentTimstamp,
  isyak: currentTimstamp,
  subuh_tomorrow: currentTimstamp,
};

const initialLocation = {
  id: 'kuala-lumpur_wilayah',
  name: 'Kuala Lumpur',
  state: 'Wilayah',
  zone: 'kl',
  othersInSameZone: ['PUTRAJAYA', 'KUALA LUMPUR'],
};

function convertTimestampToHumanTime(timestamp: number): string {
  const time: Date = new Date(timestamp * 1000);
  const hour: number = time.getHours();
  const minute: number = time.getMinutes();
  const formattedHour: String = hour > 12 ? `${(hour - 12)}` : `${hour}`;
  const formattedMinute: String = minute < 10 ? `0${minute}` : `${minute}`;
  return `${formattedHour}:${formattedMinute}`;
}

function displayCountdown(hour: number, minute: number, second: number) : string {
  const hourTwoDigits = hour >= 10 ? hour : `0${hour}`;
  const minuteTwoDigits = minute >= 10 ? minute : `0${minute}`;
  const secondTwoDigits = second >= 10 ? second : `0${second}`;
  return `${hourTwoDigits}:${minuteTwoDigits}:${secondTwoDigits}`;
}

function getNextSolatName(currentSolatName: string): string {
  const solatTimeArray = [
    'subuh',
    'syuruk',
    'zohor',
    'asar',
    'maghrib',
    'isyak',
    'subuh_esok'];
  const currentSolatIndex = solatTimeArray.indexOf(currentSolatName);
  return solatTimeArray[currentSolatIndex + 1];
}


ReactModal.setAppElement('#root');

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

  // modal states
  const [showLocationModal, setshowLocationModal] = useState(false);

  function logCurrentCountdown() {
    console.log(`${countdownHour}:${countdownMinutes}:${countdownSeconds}`);
  }

  function calculateCountdown(nextSolatName: string) {
    const current = new Date();
    // console.log(nextSolatName);
    const nextSolatTime = waktuSolatToday[nextSolatName];
    const countdownInSeconds = ((nextSolatTime * 1000) - current.getTime()) / 1000;

    // change to next solat
    if (countdownInSeconds <= 0) {
      setNextSolat(getNextSolatName(nextSolat));
    }

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
      datestamp: 1589644800,
      imsak: 1589664660,
      subuh: 1589665260,
      syuruk: 1589670060,
      zohor: 1589692320,
      asar: 1589704500,
      maghrib: 1589714400,
      isyak: 1589718840,
      subuh_tomorrow: 1589751660,
    });
    setIsLoading('DONE');

    return () => {};
  }, [waktuSolatToday.imsak]);

  const chooseLocation = () => {
    console.group('modal-to-choose-place');
    console.info('SHOW Modal to choose location');
    console.table([['selangor', 'sghr01'], ['selangor', 'sghr02'], ['terengganu', 'setiu']]);
    console.groupEnd();

    setshowLocationModal(true);
  };

  interface ZoneLocationInterface {
    id: string,
    zone: string,
    lokasi: string,
    negeri: string,
    othersInSameZone: Array<string>,
  }

  const changeLocation = (zone: ZoneLocationInterface) => {
    setLocation({
      id: zone.id,
      name: zone.lokasi,
      state: zone.negeri,
      zone: zone.zone,
      othersInSameZone: zone.othersInSameZone,
    });
    setshowLocationModal(false);
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
          <SolatLocation name={location.name} onClick={chooseLocation} />
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
      <ReactModal
        isOpen={showLocationModal}
        onRequestClose={() => setshowLocationModal(false)}
        contentLabel="Pilih Zon Lokasi Anda"
        shouldCloseOnOverlayClick={true}
        overlayClassName="modal-overlay"
      >
        <h2>Pilih Lokasi Zon</h2>
        {Object.entries(groupedZonesByStates.groupByStates).map(([state, zones]) => (
          <div key={state.toLowerCase()}>
            <span>{state}</span>
            {zones.map((zone) => (
              (
                <button
                  type="button"
                  key={`${zone.id}`}
                  onClick={() => changeLocation(zone)}
                >
                  {zone.lokasi}
                </button>
              )
            ))}
          </div>
        ))}
      </ReactModal>
    </div>
  );
}

export default App;

import React, {useState, useEffect} from 'react';
import {MasukWaktuLogo} from './MasukWaktuLogo';
import {FiSettings, FiEdit2} from 'react-icons/fi'
import {WaktuSolatDiv} from './WaktuSolatDiv'

const initialWaktuSolatToday = {
  imsak: '00:00',
  subuh: '00:00',
  syuruk: '00:00',
  zohor: '00:00',
  asar: '00:00',
  maghrib: '00:00',
  isyak: '00:00'
}

const initialLocation = {id: 'kuala-lumpur_wilayah', name: 'Kuala Lumpur', state: 'Wilayah', zone: 'kl',
  othersInSameZone: ['PUTRAJAYA', 'KUALA LUMPUR']}

function App() {
  const [countdown, setCountdown] = useState('00:05:43')
  const [seconds, setSeconds] = useState(0)

  const [waktuSolatToday, setWaktuSolatToday] = useState(initialWaktuSolatToday);
  const [location, setLocation] = useState(initialLocation)
  const [isLoading, setIsLoading] = useState('none')

  useEffect(() => {    
    const counter = setInterval(function () {
      if (seconds >= 59) {
        setSeconds(0)
      } else {
        setSeconds(seconds + 1)
      }
      const timeToNext = `00:05:${seconds < 10 ? '0' + seconds : seconds }`
      setCountdown(timeToNext)
      // console.log(timeToNext)

    }, 1000)

    // GET https://_____
    // 
      setIsLoading('LOADING')
      setLocation({
        id: 'subang-jaya_selangor', name: 'Subang Jaya', state: 'Selangor', zone: 'SGHR01',
  othersInSameZone: ['SUBANG JAYA', 'PETALING JAYA', 'GOMBAK', 'HULU LANGAT', 'SEPANG',
    'HULU SELANGOR', 'SHAH ALAM']
      })
      setWaktuSolatToday({
        imsak: '05:43',
        subuh: '05:53',
        syuruk: '07:02',
        zohor: '13:13',
        asar: '16:32',
        maghrib: '19:20',
        isyak: '20:31'
      })
      setIsLoading('DONE');
    return () => {
      clearInterval(counter)
    }
  }, [seconds])

  const chooseLocation = () => {
    console.group('modal-to-choose-place')
    console.info('SHOW Modal to choose location')
    console.table([['selangor', 'sghr01'],['selangor', 'sghr02'], ['terengganu', 'setiu']])
    console.groupEnd()
  }

  return (
    <div className="App">
      <header style={{textAlign: 'center'}}>
        <div style={{backgroundColor: '#c4c4c4', padding: '16px', display: 'inline-block'}}>
          <MasukWaktuLogo size={24} color='#767676' />
        </div>
      </header>
      <div style={{position: 'fixed', top: '32px', right: '32px'}}>
        <FiSettings />
      </div>
      <div style={{width: '100%',textAlign: "center", position: 'relative'}}>
        <div style={{fontSize:'20vw', fontFamily: 'Squada One', margin: '32px 0 32px 0', letterSpacing: '0.1em', color: '#dfdfdf',
          position: 'absolute', top: '0', width: '100%', fontVariantNumeric: 'ordinal'}}>
          {countdown}
        </div>
        <div style={{fontSize:'20vw', fontFamily: 'Squada One', margin: '32px 0 32px 0', letterSpacing: '0.1em',
            clipPath: 'inset(100% 50% 100% 100%)', position: 'absolute', width: '100%', fontVariantNumeric: 'ordinal'}}>
          {countdown}
        </div>
        <div style={{fontSize:'20vw', fontFamily: 'Squada One', margin: '32px 0 16px 0', letterSpacing: '0.1em',
          visibility: 'hidden'}}>
          _
        </div>
      </div>
      <div style={{textAlign: 'center', color: '#787878', fontFamily: 'Roboto', fontSize: '24px'}}>
        Sebelum Masuk Waktu 
        <span style={{fontWeight: 'bold'}}> SUBUH </span>
        di
        <span style={{fontWeight: 'bold', textDecoration: 'underline'}}> {location.name}</span>
        <span 
          onClick={chooseLocation}
          style={{width: '24px', height: '24px', padding: '0px', backgroundColor: '#333', borderRadius: '50%', position: 'relative', 
          display:'inline-block', textAlign: 'center', top: '-12px', cursor: 'pointer'}}>
          <FiEdit2 color="#fff" size="14" style={{position: 'absolute', right: '4px', top: '4px'}}/>
        </span>
      </div>
      <div style={{textAlign: 'center', color: '#c5c5c5', lineHeight: '32px', maxWidth: '600px', margin: '0 auto'}}>
        <div>
        dan kawasan-kawasan yang sama waktu dengannya
        </div>
        <div>
        {location.othersInSameZone.join(' | ')}
        </div>
      </div>

      <footer style={{position: 'fixed', bottom: '0'}}>
        {isLoading === 'DONE'
        &&
        <div style={{display: 'flex'}}>
          <WaktuSolatDiv name="IMSAK"   time={waktuSolatToday.imsak} ampm="am"/>
          <WaktuSolatDiv name="SUBUH"   time={waktuSolatToday.subuh} ampm="am"/>
          <WaktuSolatDiv name="SYURUK"  time={waktuSolatToday.syuruk} ampm="am"/>
          <WaktuSolatDiv name="ZOHOR"   time={waktuSolatToday.zohor} ampm="pm"/>
          <WaktuSolatDiv name="ASAR"    time={waktuSolatToday.asar} ampm="pm"/>
          <WaktuSolatDiv name="MAGHRIB" time={waktuSolatToday.maghrib} ampm="pm"/>
          <WaktuSolatDiv name="ISYAK"   time={waktuSolatToday.isyak} ampm="pm"/>
        </div>
        }

        <div style={{textAlign: 'center',padding: '8px 0', backgroundColor: '#000', color: '#fff', letterSpacing: '1px'}}>
          <MasukWaktuLogo size={18} color='#ddd'/>
          {' '}
          mencari penaja <strong>RM5k</strong> setahun.
          {' '}
          <span style={{textDecoration: 'underline', color: '#ccc', fontSize: '12px', cursor: 'pointer'}}>selanjutnya</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

import React, {useState, useEffect} from 'react';
import {MasukWaktuLogo} from './MasukWaktuLogo';
import {FiSettings, FiEdit, FiEdit2} from 'react-icons/fi'

function App() {
  useEffect(() => {    
    const counter = setInterval(function () {
      const seconds = Math.floor(Math.random() * 60)
      const timeToNext = `00:05:${seconds < 10 ? '0'+seconds: seconds}`
      setCountdown(timeToNext)
      // console.log(timeToNext)
    }, 1000)
    return () => {
      clearInterval(counter)
    }
  }, [])

  const [countdown, setCountdown] = useState('00:05:43')

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
        <span style={{fontWeight: 'bold', textDecoration: 'underline'}}> SUBANG JAYA</span>
        <span style={{width: '24px', height: '24px', padding: '0px', backgroundColor: '#333', borderRadius: '50%', position: 'relative', 
          display:'inline-block', textAlign: 'center', top: '-12px'}}>
          <FiEdit2 color="#fff" size="14" style={{position: 'absolute', right: '4px', top: '4px'}}/>
        </span>
      </div>
      <div style={{textAlign: 'center', color: '#c5c5c5', lineHeight: '32px', maxWidth: '600px', margin: '0 auto'}}>
        <div>
        dan kawasan-kawasan yang sama waktu dengannya
        </div>
        <div>
        SUBANG JAYA | PETALING JAYA | GOMBAK | HULU LANGAT | SEPANG |
        HULU SELANGOR | SHAH ALAM
        </div>
      </div>

      <div style={{display: 'flex'}}>
        <div>
          <div>IMSAK</div>
          <div>
            5:43
            <span>am</span>
          </div>
        </div>
        <div>
          SUBUH
          5:53 am
        </div>
        <div>
          SYURUK
          7:02 am
        </div>
        <div>
          ZOHOR
          1:13 pm
        </div>
        <div>
          ASAR
          4:32 pm
        </div>
        <div>
          MAGHRIB
          7:20 pm
        </div>
        <div>
          ISYAK
          8:31 pm
        </div>,
      </div>

      <div>
        <div>MASUKWAKTU</div>
        Looking for sponsor about RM3k per year
      </div>
    </div>
  );
}

export default App;

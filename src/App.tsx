import React from 'react';
import {MasukWaktuLogo} from './MasukWaktuLogo';

function App() {
  return (
    <div className="App">
      <header style={{textAlign: 'center'}}>
        <div style={{backgroundColor: '#c4c4c4', padding: '16px', display: 'inline-block'}}>
          <MasukWaktuLogo size={24} color='#767676' />
        </div>
      </header>
      <div>*</div>
      <div>00:05:43</div>
      <div>
      Sebelum Masuk Waktu SUBUH di SUBANG JAYA^
      </div>
      <div>
      dan kawasan-kawasan yang sama waktu dengannya
      </div>
      <div>
      SUBANG JAYA | PETALING JAYA | GOMBAK | HULU LANGAT | SEPANG |
      HULU SELANGOR | SHAH ALAM
      </div>
      <div>
        <div>
          IMSAK
          5:43 am
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
        </div>
      </div>
      <div>
        <div>MASUKWAKTU</div>
        Looking for sponsor about RM3k per year
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import styled from 'styled-components';
import { ThemesConfig } from './themes/themes';

const WaktuSolat = styled.div`
  background-color: ${(props) => ThemesConfig[props.theme.main].waktuSolatBackground};
  width: calc(100vw/7);
  text-align: center;
  padding: 16px 0;
  position: relative;
  .name {
    color: ${(props) => ThemesConfig[props.theme.main].waktuSolatColor};
    font-size: 18px;

    @media screen and (max-width: 678px) {
      font-size: 12px;
      margin-bottom: 8px;
    }
  }
  .time {
    color: ${(props) => ThemesConfig[props.theme.main].waktuSolatTimeColor};
    font-size: 36px;
    font-weight: ${(props) => ThemesConfig[props.theme.main].waktuSolatTimeFontWeight};
    @media screen and (max-width: 678px) {
      font-size: 16px;
    }
  }
  .ampm {
    color: ${(props) => ThemesConfig[props.theme.main].waktuSolatTimeColor};
    font-size: 18px;
    @media screen and (max-width: 678px) {
      /* font-size: 10px; */
      display: none;
    }
  }
`;

const CurrentHighlight = styled.div`
  background-color: ${(props) => ThemesConfig[props.theme.main].waktuSolatBackground};
  height: 20px;
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 100%;
`;

interface WaktuSolatDivProp{
  name: string;
  time: string;
  ampm: string;
  isActive: boolean;
}

const WaktuSolatDiv = (prop: WaktuSolatDivProp) => (
  <WaktuSolat>
    {prop.isActive && <CurrentHighlight />}
    <div className="name">{prop.name || '0'}</div>
    <div>
      <span className="time">{prop.time}</span>
      <span className="ampm"> {prop.ampm}</span>
    </div>
  </WaktuSolat>
);

export {
  WaktuSolatDiv,
};

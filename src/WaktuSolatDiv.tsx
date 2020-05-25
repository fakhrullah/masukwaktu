import React from 'react';
import styled from 'styled-components';

const WaktuSolat = styled.div`
  background-color: #c4c4c4;
  width: calc(100vw/7);
  text-align: center;
  padding: 16px 0;
  .name {
    color: #767676;
    font-size: 18px;

    @media screen and (max-width: 678px) {
      font-size: 12px;
      margin-bottom: 8px;
    }
  }
  .time {
    color: #000;
    font-size: 36px;
    font-weight: bold;
    @media screen and (max-width: 678px) {
      font-size: 16px;
    }
  }
  .ampm {
    color: #000;
    font-size: 18px;
    @media screen and (max-width: 678px) {
      /* font-size: 10px; */
      display: none;
    }
  }
`;

interface WaktuSolatDivProp{
  name: string;
  time: string;
  ampm: string;
}

const WaktuSolatDiv = (prop: WaktuSolatDivProp) => (
  <WaktuSolat>
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

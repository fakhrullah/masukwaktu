import React from 'react';
import styled from 'styled-components';
import { displayCountdown } from './utils/helpers';

const CountdownWrapper = styled.div`
  width: 100%; 
  text-align: center;
  position: relative;
`;

const CountdownTimer = styled.div`
  position: absolute;
  font-size: 20vw;
  font-family: "SquadaOne";
  margin: 32px 0 32px 0;
  letter-spacing: 0.1em;
  color: #dfdfdf;
  top: 0;
  width: 100%;

  .shrink & {
    font-size: 4vw;
  }
`;

const CountdownPlaceholder = styled.div`
  font-size: 20vw;
  font-family: "SquadaOne";
  margin: 32px 0 16px 0;
  letter-spacing: 0.1em;
  visibility: hidden;

  .shrink & {
    font-size: 4vw;
  }
`;

interface Props {
  countdown: Array<number>;
}

const Countdown = ({ countdown }: Props) => {
  const [hour, minutes, second] = countdown;
  let highlightPercentage: number;

  if (hour >= 10) {
    highlightPercentage = 100;
  } else if (hour > 0) {
    highlightPercentage = 83;
  } else if (minutes >= 10) {
    highlightPercentage = 64;
  } else if (minutes > 0) {
    highlightPercentage = 50;
  } else {
    highlightPercentage = 30;
  }

  return (
    <CountdownWrapper>
      <CountdownTimer>
        {displayCountdown(hour, minutes, second)}
      </CountdownTimer>
      <CountdownTimer style={{
        color: '#333',
        clipPath: `inset(0% 0% 0% ${100 - highlightPercentage}%)`,
        WebkitClipPath: `inset(0% 0% 0% ${100 - highlightPercentage}%)`,
      }}
      >
        {displayCountdown(hour, minutes, second)}
      </CountdownTimer>
      <CountdownPlaceholder>
        -
      </CountdownPlaceholder>
    </CountdownWrapper>
  );
};

export default Countdown;

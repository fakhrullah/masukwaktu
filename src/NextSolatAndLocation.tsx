import React from 'react';
import styled from 'styled-components';
import { FiEdit2 } from 'react-icons/fi';

const NextSolatAndLocation = styled.div`
    text-align: center;
    color: #787878;
    font-family: 'Roboto';
    font-size: 24px;
`;

// -------------------------

interface SameZoneProps {
  othersLocationInSameZone: Array<string>
}

const SameZoneDiv = styled.div`
  color: #c5c5c5;
  line-height: 32px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  font-size: 16px;
`

const SameZone = (props: SameZoneProps) => (
  <SameZoneDiv>
    <div>
      dan kawasan-kawasan yang sama waktu dengannya
    </div>
    <div>
      {props.othersLocationInSameZone.join(' | ')}
    </div>
  </SameZoneDiv>
);

// -------------------------

const NextSolatDiv = styled.span`
    font-weight: bold;
`;

interface NextSolatProps {
  name: string
}

const NextSolat = (props: NextSolatProps) => <NextSolatDiv>{props.name}</NextSolatDiv>;

// -------------------------

interface SolatLocationProps{
  name: string
  onClick: (event: React.MouseEvent<HTMLSpanElement>) => void
}

const SolatLocationDiv = styled.span`
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;

const SolatLocation = (props: SolatLocationProps) => (
  <SolatLocationDiv onClick={props.onClick}>{props.name}</SolatLocationDiv>
);


// --------------------

const ChangeLocationButtonDiv = styled.span`
  position: relative;
  top: -12px;
  display: inline-block;
  text-align: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background-color: #333;
  border-radius: 50%;
  cursor: pointer;

  .icon {
      position: absolute;
      top: 4px;
      right: 4px;
  }
`;

interface ChangeLocationButtonProps extends React.HTMLAttributes<HTMLElement> {
}

const ChangeLocationButton = (props: ChangeLocationButtonProps) => (
  <ChangeLocationButtonDiv onClick={props.onClick}>
    <FiEdit2 color="#fff" size="14" className="icon" />
  </ChangeLocationButtonDiv>
);

export {
  NextSolatAndLocation,
  SameZone,
  SolatLocation,
  NextSolat,
  ChangeLocationButton,
};

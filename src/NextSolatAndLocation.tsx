import React from 'react';
import styled from 'styled-components';
import { FiEdit2 } from 'react-icons/fi';
import { ThemesConfig } from './themes/themes';

const NextSolatAndLocation = styled.div`
  margin-top: 24px;
  padding: 8px;
  font-family: 'Roboto';
  text-align: center;
  font-size: 24px;
  
  color: ${(props) => ThemesConfig[props.theme.main].nextSolatAndLocationColor};

  @media screen and (max-width: 678px) {
    font-size: 16px;
  }
  @media screen and (max-width: 478px) {
    margin-top: 40px;
    font-size: 12px;
  }
`;

// -------------------------

interface SameZoneProps {
  othersLocationInSameZone: Array<string>
}

const SameZoneDiv = styled.div`
  line-height: 32px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  font-size: 16px;
  color: ${(props) => ThemesConfig[props.theme.main].sameZoneColor};
  
  @media screen and (max-width: 678px) {
    font-size: 12px;
    line-height: 20px;
  }
  @media screen and (max-width: 478px) {
    font-size: 10px;
  }
`;

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
    text-transform: capitalize;
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
  
  @media screen and (max-width: 678px) {
    width: 16px;
    height: 16px;
  }
  @media screen and (max-width: 478px) {
    width: 12px;
    height: 12px;
  }

  .icon {
    position: absolute;
    top: 4px;
    right: 4px;
    @media screen and (max-width: 678px) {
      top: -2px;
      right: -2px;
    }
    @media screen and (max-width: 478px) {
      top: -3px;
      right: -3px;
    }
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

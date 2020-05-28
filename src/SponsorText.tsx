/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styled from 'styled-components';
import { MasukWaktuLogo } from './MasukWaktuLogo';
import { ThemesConfig } from './themes/themes';

interface Props {
  onClick: (event: React.MouseEvent<HTMLSpanElement>) => void
}

const SponsorTextDiv = styled.div`
  text-align: center;
  padding: 8px 0;
  background-color: ${(props) => ThemesConfig[props.theme.main].sponsorBackground};
  color: ${(props) => ThemesConfig[props.theme.main].sponsorColor};
  letter-spacing: 1px;

  @media screen and (max-width: 678px) {
    font-size: 12px;
  }

  .detail-modal {
    text-decoration: underline;
    color: #ccc;
    font-size: 80%;
    cursor: pointer;
  }

  .logo-span {
    display: inline-block;
    > svg {
      fill: ${(props) => ThemesConfig[props.theme.main].footerLogo} !important;
    }
    @media screen and (max-width:678px) {
      transform-origin: 100% 80% 0;
      transform: scale(60%);
    }
  }
`;

export const SponsorText = (props: Props) => (
  <SponsorTextDiv>
    <span className="logo-span">
      <MasukWaktuLogo size={18} color="#ddd" />
    </span>
    {' '}
    mencari penaja <strong>RM5k</strong> setahun.
    {' '}
    <span className="detail-modal" onClick={props.onClick}>selanjutnya</span>
  </SponsorTextDiv>
);

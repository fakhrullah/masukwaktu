/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styled from 'styled-components';
import { MasukWaktuLogo } from './MasukWaktuLogo';

interface Props {
  onClick: (event: React.MouseEvent<HTMLSpanElement>) => void
}

const SponsorTextDiv = styled.div`
    text-align: center;
    padding: 8px 0;
    background-color: #000;
    color: #fff;
    letter-spacing: 1px;

    .detail-modal {
        text-decoration: underline;
        color: #ccc;
        font-size: 12px;
        cursor: pointer;
    }
`;

export const SponsorText = (props: Props) => (
  <SponsorTextDiv>
    <MasukWaktuLogo size={18} color="#ddd" />
    {' '}
    mencari penaja <strong>RM5k</strong> setahun.
    {' '}
    <span className="detail-modal" onClick={props.onClick}>selanjutnya</span>
  </SponsorTextDiv>
);

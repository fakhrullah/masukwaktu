import React from 'react';
import styled from 'styled-components';
import { MasukWaktuLogo } from './MasukWaktuLogo';

interface Props {

}

const HeaderDiv = styled.header`
    text-align: center;

    .logo-div{
        background-color: #c4c4c4;
        padding: 16px;
        display: inline-block;
    }
`;

const Header = (props: Props) => (
  <HeaderDiv>
    <div className="logo-div">
      <MasukWaktuLogo size={24} color="#767676" />
    </div>
  </HeaderDiv>
);

export default Header;

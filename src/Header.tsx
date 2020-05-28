import React from 'react';
import styled from 'styled-components';
import { MasukWaktuLogo } from './MasukWaktuLogo';
import { ThemesConfig } from './themes/themes';

interface Props {

}

const HeaderDiv = styled.header`
  text-align: center;

  .logo-div{
    background-color: ${(props) => ThemesConfig[props.theme.main].logoBackground};
    padding: 16px;
    display: inline-block;
    @media screen and (max-width: 678px) {
      transform: scale(60%);
      transform-origin: 50% 0 0;
    }
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

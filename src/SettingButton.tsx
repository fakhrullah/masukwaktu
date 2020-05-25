import React from 'react';
import { FiSettings } from 'react-icons/fi';
import styled from 'styled-components';

interface Props {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

const ButtonWrapper = styled.div`
    position: fixed;
    right: 32px;
    top: 32px;
    cursor: pointer;

    @media screen and (max-width: 678px) {
      top: 16px;
      right: 16px;
    }
`;

export const SettingButton = ({ onClick }: Props) => (
  <ButtonWrapper onClick={onClick}>
    <FiSettings />
  </ButtonWrapper>
);

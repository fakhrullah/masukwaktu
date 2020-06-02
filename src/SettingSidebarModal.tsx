import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

interface Props {
  isOpen: boolean;
  onRequestClose: (event: React.MouseEvent<HTMLElement>) => void;
}

interface ThemeButtonProps{
  fontColor? : string;
  color: string;
}

const ThemeButton = styled.button<ThemeButtonProps>`
  color: ${({ fontColor }) => fontColor || '#333'};
  background-color: ${({ color }) => color};
  border: solid 2px #222;
  padding: 4px 16px;
  border-radius: 16px;
  margin-left: 8px;
  cursor: pointer;
`;

const SettingSidebarModal = ({ isOpen, onRequestClose }: Props) => {
  const changeTheme = (value: string) => {
    localStorage.setItem('theme', value);
    window.location.replace(window.location.href);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-sidebar-overlay modal-sidebar-overlay--after-open modal-sidebar-overlay--before-open"
      className="modal-sidebar"
    >
      <button onClick={onRequestClose} type="button">X</button>
      <h2>Tetapan</h2>

      <h4>Tema warna</h4>
      <div>
        <ThemeButton color="#222" fontColor="#fff" type="button" onClick={() => changeTheme('dark')}>Dark</ThemeButton>
        <ThemeButton color="#fff" type="button" onClick={() => changeTheme('light')}>Light</ThemeButton>
      </div>

      <h4>Tunjuk dan sorok elemen</h4>
      <p>
        <em>dalam proses pembangunan</em>
      </p>

      <h4>Iqamah</h4>
      <p>
        <em>dalam proses pembangunan</em>
      </p>
    </ReactModal>
  );
};

export default SettingSidebarModal;

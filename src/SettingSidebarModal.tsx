import React, { useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

interface Props {
  isOpen: boolean;
  onRequestClose: (event: React.MouseEvent<HTMLElement>) => void;
  setHideSameZoneDesc: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setHideSponsorFooter: (value: boolean | ((prevVar: boolean) => boolean)) => void;
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

const Label = styled.label`
  display: block;
  cursor: pointer;
  padding: 8px 0px;
`

const initialStateHideSameZoneDesc: boolean = !!localStorage.getItem('hide-same-zone-desc');
const initialStateHideSponsorFooter: boolean = !!localStorage.getItem('hide-sponsor-footer');

const SettingSidebarModal = ({
  isOpen, onRequestClose, setHideSameZoneDesc, setHideSponsorFooter,
}: Props) => {
  const changeTheme = (value: string) => {
    localStorage.setItem('theme', value);
    window.location.replace(window.location.href);
  };

  const changeHideSameZoneConfig = () => {
    // console.log(hideSameZoneChecked);
    const currentSameZoneChecked = hideSameZoneChecked;
    localStorage.setItem('hide-same-zone-desc', currentSameZoneChecked ? '' : 'set');
    setHideSameZoneChecked(!currentSameZoneChecked);
    setHideSameZoneDesc(!currentSameZoneChecked);
  };

  const toggleHideSponsorFooterConfig = () => {
    const currentHideSponsorFooterChecked = hideSponsorChecked;
    localStorage.setItem('hide-sponsor-footer', currentHideSponsorFooterChecked ? '' : 'set');
    setHideSponsorChecked(!currentHideSponsorFooterChecked);
    setHideSponsorFooter(!currentHideSponsorFooterChecked);
  };

  const [hideSameZoneChecked, setHideSameZoneChecked] = useState(initialStateHideSameZoneDesc);
  const [hideSponsorChecked, setHideSponsorChecked] = useState(initialStateHideSponsorFooter);

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
      <div>
        <Label htmlFor="hide-same-zone-desc-config">
          <input
            type="checkbox"
            name="hide-same-zone-desc"
            id="hide-same-zone-desc-config"
            onChange={changeHideSameZoneConfig}
            checked={hideSameZoneChecked}
          />
          {' '}
          Sorok <q>dan kawasan-kawasan sewaktu dengannya</q>
        </Label>
        <Label htmlFor="hide-sponsor-footer-config">
          <input
            type="checkbox"
            name="hide-sponsor-footer"
            id="hide-sponsor-footer-config"
            onChange={toggleHideSponsorFooterConfig}
            checked={hideSponsorChecked}
          />
          {' '}
          Sorok penaja pada bahagian bawah skrin
        </Label>
      </div>

      <h4>Iqamah</h4>
      <p>
        <em>dalam proses pembangunan</em>
      </p>
    </ReactModal>
  );
};

export default SettingSidebarModal;

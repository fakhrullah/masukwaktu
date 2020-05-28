import React from 'react';
import ReactModal from 'react-modal';

interface Props {
  isOpen: boolean;
  onRequestClose: (event: React.MouseEvent<HTMLElement>) => void;
}

const SettingSidebarModal = ({ isOpen, onRequestClose }: Props) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="modal-sidebar-overlay modal-sidebar-overlay--after-open modal-sidebar-overlay--before-open"
    className="modal-sidebar"
  >
    <button onClick={onRequestClose} type="button">X</button>
    <h2>Tetapan</h2>

    <h4>Tema warna</h4>
    <p>
      <em>dalam proses pembangunan</em>
    </p>

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

export default SettingSidebarModal;

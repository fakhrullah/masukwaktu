import React from 'react';
import ReactModal from 'react-modal';
import { MasukWaktuLogo } from './MasukWaktuLogo';

interface AboutModalProps {
  isOpen: boolean;
  onRequestClose: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const AboutModal = ({ isOpen, onRequestClose }: AboutModalProps) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    shouldCloseOnOverlayClick={true}
    overlayClassName="modal-overlay"
  >
    <h2>MASUKWAKTU</h2>
    <p>
      <a href="https://github.com/fakhrullah/masukwaktu">Github Repo MasukWaktu</a>
    </p>

    <h3>Terima kasih kepada penaja:</h3>
    <p>
      Jutaan terima kasih kepada <code>&lt;nama penaja dan link ke website penaja&gt;</code>,
      {' '}
      kerana telah menyumbang RM 6k untuk kemajuan <MasukWaktuLogo size={16} color="#333" />
      {' '}
      sepanjang <code>Jun 2020</code> ~ <code>Jun 2021</code>
    </p>

    <h3>Terima kasih kepada semua yang membantu  <MasukWaktuLogo size={16} color="#333" /></h3>
    <ul>
      <li><code>&lt;nama programmer / designer / dan lain-lain &gt;</code></li>
      <li><code>&lt;nama programmer / designer / dan lain-lain &gt;</code></li>
      <li><code>&lt;nama programmer / designer / dan lain-lain &gt;</code></li>
      <li><code>&lt;nama programmer / designer / dan lain-lain &gt;</code></li>
    </ul>
  </ReactModal>
);

export default AboutModal;

import React from 'react'
import ReactModal from 'react-modal'
import groupedZonesByStates from './data/group-by-states.json';

interface Zone {
  id: string;
  zone: string;
  negeri: string;
  lokasi: string;
  lat: string;
  lng: string;
  othersInSameZone: string[];
}

interface ChooseLocationModalProps {
  isOpen: boolean;
  onRequestClose: (event: React.MouseEvent<HTMLElement>) => void;
  changeLocation: (zone: Zone) => void;
}

const ChooseLocationModal = ({isOpen, onRequestClose, changeLocation}: ChooseLocationModalProps) => {
  return (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Pilih Zon Lokasi Anda"
    shouldCloseOnOverlayClick={true}
    overlayClassName="modal-overlay"
  >
    <h2>Pilih Lokasi Zon</h2>
    {Object.entries(groupedZonesByStates.groupByStates).map(([state, zones]) => (
      <div key={state.toLowerCase()}>
        <span>{state}</span>
        {zones.map((zone) => (
          (
            <button
              type="button"
              key={`${zone.id}`}
              onClick={() => changeLocation(zone)}
            >
              {zone.lokasi}
            </button>
          )
        ))}
      </div>
    ))}
  </ReactModal>
  )
}

export default ChooseLocationModal

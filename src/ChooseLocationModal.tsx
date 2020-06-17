import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
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

const Row = styled.div`
  display: flex;
  padding: 16px;
  border: solid 1px #f3f3f3;
  & > div:first-child {
    min-width: 120px;
  }
`;

const LocationButton = styled.button`
  margin: 4px;
  background-color: #e4e4e4;
  border: solid #ccc 1px;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #333;
    color: white;
  }
`;

const ChooseLocationModal = ({
  isOpen,
  onRequestClose,
  changeLocation,
}: ChooseLocationModalProps) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Pilih Zon Lokasi Anda"
    shouldCloseOnOverlayClick={true}
    overlayClassName="modal-overlay"
  >
    <h2>Pilih Lokasi Zon</h2>
    {Object.entries(groupedZonesByStates.groupByStates).map(([state, zones]) => (
      <Row key={state.toLowerCase()}>
        <div>
          <span>{state}</span>
        </div>
        <div>
          {zones.map((zone) => (
            (
              <LocationButton
                type="button"
                key={`${zone.id}`}
                onClick={() => changeLocation(zone)}
              >
                {zone.lokasi}
              </LocationButton>
            )
          ))}
        </div>
      </Row>
    ))}
  </ReactModal>
);

export default ChooseLocationModal;

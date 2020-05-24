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
    <h2>Setting</h2>
    <div>
      <p>
        <a href="https://github.com/fakhrullah/masukwaktu">Github Repo MasukWaktu</a>
      </p>
      <h4>Lorem ipsum dolor sit amet</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue eros quis ornare consectetur. Fusce eu volutpat tortor. Morbi vehicula lorem et risus imperdiet bibendum. Vivamus nec purus a risus auctor fermentum. Cras sem diam, eleifend vel suscipit venenatis, mollis convallis ipsum. In in orci nec quam pulvinar efficitur. Praesent felis sapien, blandit sed eros a, aliquet viverra erat. Nam egestas, erat eu porta convallis, tortor mauris imperdiet lectus, non consequat orci mauris ac felis. Sed tempus ex non ligula gravida venenatis.
      </p>
      <p>
        Nullam nec nisl ac nulla ultrices feugiat. Morbi volutpat tincidunt semper. Suspendisse faucibus suscipit lectus, eget ullamcorper nunc facilisis pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non turpis auctor, ullamcorper justo id, dignissim magna. Duis blandit rhoncus imperdiet. Maecenas blandit, elit a blandit pretium, ex lacus mollis diam, in cursus nibh sem eget diam. Morbi sit amet molestie tellus.
      </p>

    </div>
  </ReactModal>
);

export default SettingSidebarModal;

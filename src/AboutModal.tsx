import React from 'react';
import ReactModal from 'react-modal';

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
    <h2>MasukWaktu</h2>
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

      <h4>tiam efficitur odio eget dui molestie</h4>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nisl lectus, varius eu rutrum vel, laoreet nec nisi. Phasellus a euismod metus, eget dignissim est. Suspendisse in ante vestibulum, pretium arcu et, faucibus lorem. Sed lobortis, velit vitae lacinia lobortis, urna mi dignissim mauris, et gravida augue nisi id libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur accumsan ut ligula sit amet tincidunt. Integer volutpat enim vel libero malesuada, a tristique velit laoreet. Quisque posuere mi quis leo sodales consequat. Aliquam hendrerit massa placerat turpis laoreet condimentum. Proin eget fermentum ante. Ut molestie maximus pellentesque. Curabitur at mi malesuada, pretium turpis eu, varius nisi. Nam tincidunt orci diam, eget sagittis nunc congue eu.
      </p>

      <p>
        Etiam efficitur odio eget dui molestie, id iaculis urna varius. Proin vitae placerat turpis, vitae dignissim augue. Etiam vitae elit elit. Etiam vitae lacus porttitor, facilisis sem et, elementum eros. Vivamus sollicitudin nisl non suscipit tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce id ex dapibus, venenatis arcu at, accumsan velit. Aliquam erat volutpat.
      </p>

      <p>
        Fusce ut fringilla mi. Pellentesque consectetur, metus ac lacinia porttitor, elit enim congue leo, nec aliquet leo velit id lectus. Nullam luctus quis tortor nec sagittis. Mauris mattis mi tristique nisl lobortis, vel ultricies lectus vulputate. Nullam pellentesque pellentesque congue. Etiam a arcu a nisl facilisis rutrum. Nulla ut arcu ut magna condimentum sollicitudin. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas tempor cursus nibh a gravida. Donec vitae congue nulla.
      </p>

      <h4>tiam efficitur odio eget dui molestie</h4>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nisl lectus, varius eu rutrum vel, laoreet nec nisi. Phasellus a euismod metus, eget dignissim est. Suspendisse in ante vestibulum, pretium arcu et, faucibus lorem. Sed lobortis, velit vitae lacinia lobortis, urna mi dignissim mauris, et gravida augue nisi id libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur accumsan ut ligula sit amet tincidunt. Integer volutpat enim vel libero malesuada, a tristique velit laoreet. Quisque posuere mi quis leo sodales consequat. Aliquam hendrerit massa placerat turpis laoreet condimentum. Proin eget fermentum ante. Ut molestie maximus pellentesque. Curabitur at mi malesuada, pretium turpis eu, varius nisi. Nam tincidunt orci diam, eget sagittis nunc congue eu.
      </p>

      <p>
        Etiam efficitur odio eget dui molestie, id iaculis urna varius. Proin vitae placerat turpis, vitae dignissim augue. Etiam vitae elit elit. Etiam vitae lacus porttitor, facilisis sem et, elementum eros. Vivamus sollicitudin nisl non suscipit tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce id ex dapibus, venenatis arcu at, accumsan velit. Aliquam erat volutpat.
      </p>

      <p>
        Fusce ut fringilla mi. Pellentesque consectetur, metus ac lacinia porttitor, elit enim congue leo, nec aliquet leo velit id lectus. Nullam luctus quis tortor nec sagittis. Mauris mattis mi tristique nisl lobortis, vel ultricies lectus vulputate. Nullam pellentesque pellentesque congue. Etiam a arcu a nisl facilisis rutrum. Nulla ut arcu ut magna condimentum sollicitudin. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas tempor cursus nibh a gravida. Donec vitae congue nulla.
      </p>
    </div>
  </ReactModal>
);

export default AboutModal;

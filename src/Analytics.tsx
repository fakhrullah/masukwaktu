import ReactGA from 'react-ga';

export class Analytics {
  static changeLocationEvent(locationName: string) {
    ReactGA.event({
      category: 'Location',
      action: 'Change Location',
      label: locationName,
    });
  }
}

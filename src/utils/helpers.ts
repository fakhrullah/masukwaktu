
function convertTimestampToHumanTime(timestamp: number): string {
  const time: Date = new Date(timestamp * 1000);
  const hour: number = time.getHours();
  const minute: number = time.getMinutes();
  const formattedHour: string = hour > 12 ? `${(hour - 12)}` : `${hour}`;
  const formattedMinute: string = minute < 10 ? `0${minute}` : `${minute}`;
  return `${formattedHour}:${formattedMinute}`;
}

function getAmPm(waktuTimestamp: number): string {
  return (new Date(waktuTimestamp * 1000).getHours() >= 12) ? 'pm' : 'am';
}

function displayCountdown(hour: number, minute: number, second: number) : string {
  const hourTwoDigits = hour >= 10 ? hour : `0${hour}`;
  const minuteTwoDigits = minute >= 10 ? minute : `0${minute}`;
  const secondTwoDigits = second >= 10 ? second : `0${second}`;
  return `${hourTwoDigits}:${minuteTwoDigits}:${secondTwoDigits}`;
}

function getNextSolatName(currentSolatName: string): string {
  const solatTimeArray = [
    'subuh',
    'syuruk',
    'zohor',
    'asar',
    'maghrib',
    'isyak',
    'subuh_tomorrow'];
  const currentSolatIndex = solatTimeArray.indexOf(currentSolatName);
  return solatTimeArray[currentSolatIndex + 1];
}

function getCurrentSolatName(nextSolatName: string) {
  const solatTimeArray = [
    'subuh',
    'syuruk',
    'zohor',
    'asar',
    'maghrib',
    'isyak',
    'subuh_tomorrow'];
  const nextSolatIndex = solatTimeArray.indexOf(nextSolatName);
  return solatTimeArray[nextSolatIndex - 1];
}

function logCurrentCountdown(hour: number, minute: number, second: number): void {
  // eslint-disable-next-line no-console
  console.log(`${hour}:${minute}:${second}`);
}


export {
  convertTimestampToHumanTime,
  displayCountdown,
  getNextSolatName,
  getCurrentSolatName,
  logCurrentCountdown,
  getAmPm,
};

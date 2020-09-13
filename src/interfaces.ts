
export interface ZoneLocationInterface {
  id: string,
  zone: string,
  lokasi: string,
  negeri: string,
  othersInSameZone: Array<string>,
}


export enum LOADING {
  START,
  PROGRESS,
  DONE
}

export interface LocationDetail {
  id: string;
  name: string;
  state: string;
  zone: string;
  othersInSameZone: Array<string>;
}


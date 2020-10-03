
export interface LocationDetail {
  id: string;
  name: string;
  state: string;
  zone: string;
  othersInSameZone: Array<string>;
}

const initializeLocation = (): LocationDetail => ({
  id: 'kuala-lumpur_wilayah',
  name: 'Kuala Lumpur',
  state: 'Wilayah',
  zone: 'wly01',
  othersInSameZone: ['PUTRAJAYA', 'KUALA LUMPUR'],
});

export {
  initializeLocation,
};

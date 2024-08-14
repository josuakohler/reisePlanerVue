export interface RoutePlayListItem {
  name: string;
  id: string;
  routen: Route[];
  checked: boolean;
}

export interface Route {
  fromStationName: string;
  stationName: string;
  platForm: string;
  departure: string;
  arrival: string;
}

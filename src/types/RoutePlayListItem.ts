export interface RoutePlayListItem {
  name: string;
  id: string;
  routen: Route[];
  checked: boolean;
}

export interface Route {
  stationName: string;
  platForm: string;
  departure: string;
  arrival: string;
}

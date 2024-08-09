export interface Location {
  name: string;
  score: number;
  coordinate: {
    type: string;
    x: number;
    y: number;
  };
}

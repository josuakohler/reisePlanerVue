import { Station } from "./Station";

export interface Checkpoints{
    station: Station,
    arrival: string;
    departure: string;
    delay: number;
    platform: number;
}
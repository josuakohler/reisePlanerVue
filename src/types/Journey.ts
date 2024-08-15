import { Checkpoints } from "./Checkpoints";

export interface Journey{
    name: number;
    category: string;
    categoryCode: number;
    number: number;
    operator: number;
    to: string;
    passList: Checkpoints;
    capacity1st: number;
    capacity2nd: number;

}
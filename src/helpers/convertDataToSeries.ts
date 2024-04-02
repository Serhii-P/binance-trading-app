import { CandleData } from "../types/types";

export const convertDataToSeries = (data: CandleData[]) => {

  return [
    {
      data: data,
    },
  ];
};
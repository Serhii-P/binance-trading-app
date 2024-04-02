import { CandleData, CandlestickData, Signal } from "../types/types";

export const generateRandomSignals = (candlestickData: CandlestickData): Signal[] => {
  const signals: Signal[] = [];
  if (Math.random() > 0.9) {
    const signal = {
      x: candlestickData[0],
      y: parseFloat(candlestickData[4]),
      volume: Math.floor(Math.random() * 1000000),
      type: Math.random() > 0.5 ? "buy" : "sell",
    };
    signals.push(signal as Signal);
  }

  return signals;
};

export const generateInitialRandomSignals = (candlestickData: CandleData[], count: number) => {
  const signals = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * candlestickData.length);
    const candle = candlestickData[randomIndex];
    const randomYIndex = Math.floor(Math.random() * candle.y.length);

    const unixTimestamp = new Date(candle.x).getTime();

    const signal = {
      x: unixTimestamp,
      y: candle.y[randomYIndex],
      volume: Math.floor(Math.random() * 1000000),
      type: Math.random() > 0.5 ? "buy" : "sell",
    };
    signals.push(signal);
  }
  return signals;
};

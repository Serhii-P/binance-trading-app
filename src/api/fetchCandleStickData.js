import axios from "axios";
import { generateInitialRandomSignals } from "../utils/generateRandomSignal";

export const fetchInitialCandlestickData = async (symbol, interval, limit) => {
  
  try {
    const response = await axios.get("https://api.binance.com/api/v3/klines", {
      params: {
        symbol,
        interval,
        limit,
      },
    });

    const candlestickData = response.data.map((candlestick) => {
      const [openTime, open, high, low, close] = candlestick;

      return {
        x: new Date(openTime),
        y: [
          parseFloat(open),
          parseFloat(high),
          parseFloat(low),
          parseFloat(close),
        ],
      };
    });

    const initialSignals = generateInitialRandomSignals(candlestickData, 7);
    return { candlestickData, initialSignals };
  } catch (error) {
    console.log("Error while fetching candles - ", error);
  }
};

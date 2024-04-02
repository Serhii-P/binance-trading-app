import axios from "axios";
import { CandlestickData, ChartProps } from "../types/types";

export const fetchInitialCandlestickData = async ({ symbol, interval, limit }: ChartProps) => {
  try {
    const response = await axios.get("https://api.binance.com/api/v3/klines", {
      params: {
        symbol,
        interval,
        limit,
      },
    });

    const candlestickData = response.data.map((candlestick: CandlestickData) => {
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

    return candlestickData;
  } catch (error) {
    console.error("Error fetching candles:", error);
    throw error;
  }
};

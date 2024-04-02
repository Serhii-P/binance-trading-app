import { Dispatch, SetStateAction } from "react";
import { CandleData, Signal } from "../types/types";

export const handleWebSocket = (
  symbol: string,
  interval: string,
  setInitialCandlestickData: Dispatch<SetStateAction<CandleData[]>>,
  setSignals: Dispatch<SetStateAction<Signal[]>>,
  fetchInitialCandlestickData: () => Promise<void>,
  generateRandomSignals: any
) => {
  const ws = new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`
  );

  ws.onopen = () => {
    console.log("ws connected");
    ws.send(
      JSON.stringify({
        method: "SUBSCRIBE",
        params: [`${symbol.toLowerCase()}@kline_${interval}`],
        id: 1,
      })
    );
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data?.k?.t) {
      const candlestick = {
        x: new Date(data.k.t),
        y: [
          parseFloat(data.k.o),
          parseFloat(data.k.h),
          parseFloat(data.k.l),
          parseFloat(data.k.c),
        ],
      };

      setInitialCandlestickData((prevData: CandleData[]) => {
        const newCandleStick = [...prevData];

        if (data.k.x) {
          fetchInitialCandlestickData();

          const newSignal = generateRandomSignals([
            data.k.t,
            data.k.o,
            data.k.h,
            data.k.l,
            data.k.c,
          ]);

          setSignals((prevSignals: Signal[]) => [...prevSignals, ...newSignal]);
        } else {
          newCandleStick[newCandleStick.length - 1] = candlestick;
        }
        return newCandleStick;
      });
    }
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return ws;
};

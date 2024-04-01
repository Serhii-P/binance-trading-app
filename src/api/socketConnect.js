import { generateRandomSignals } from "../utils/generateRandomSignal";

export const handleWebSocketConnection = (
  symbol,
  interval,
  setInitialCandlestickData,
  setSignals
) => {
  const ws = new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`
  );

  ws.onopen = () => {
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

      setInitialCandlestickData((prevData) => {
        const newCandleStick = [...prevData];
        if (data.k.x) {
          const newSignal = generateRandomSignals([
            data.k.t,
            data.k.o,
            data.k.h,
            data.k.l,
            data.k.c,
          ]);
          setSignals((prevSignals) => [...prevSignals, ...newSignal]);
        } else {
          newCandleStick[newCandleStick.length - 1] = candlestick;
        }
        return newCandleStick;
      });
    }
  };

  return ws;
};

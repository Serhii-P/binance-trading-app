import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { convertDataToSeries } from "../helpers/convertDataToSeries";
import { optionsWithAnnotations } from "./chartConfig";
import SignalTable from "../tables/signalTable";
import { fetchInitialCandlestickData } from "../api/fetchCandleStickData";
import { handleWebSocketConnection } from "../api/socketConnect";

const TradingChart = ({ interval, symbol }) => {
  const [initialCandlestickData, setInitialCandlestickData] = useState([]);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { candlestickData, initialSignals } =
        await fetchInitialCandlestickData(symbol, interval, 50);
      setInitialCandlestickData(candlestickData);
      setSignals(initialSignals);
      setLoading(false);
    };

    fetchData();

    const ws = handleWebSocketConnection(
      symbol,
      interval,
      setInitialCandlestickData,
      setSignals
    );

    return () => {
      ws.close();
    };
  }, [symbol, interval]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const options = optionsWithAnnotations(signals);
  return (
    <>
      <ReactApexChart
        options={options}
        series={convertDataToSeries(initialCandlestickData)}
        type="candlestick"
        height={350}
        width={1000}
      />

      <SignalTable signals={signals} />
    </>
  );
};

export default TradingChart;

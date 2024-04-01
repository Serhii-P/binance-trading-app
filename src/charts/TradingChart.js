import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { convertDataToSeries } from "../helpers/convertDataToSeries";
import { optionsWithAnnotations } from "./chartConfig";
import SignalTable from "../tables/signalTable";
import { fetchInitialCandlestickData } from "../api/fetchCandleStickData";
import { handleWebSocket } from "../api/socketConnect";
import {
  generateInitialRandomSignals,
  generateRandomSignals,
} from "../utils/generateRandomSignal";

const TradingChart = ({ interval, symbol }) => {
  const [initialCandlestickData, setInitialCandlestickData] = useState([]);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const signalsGenerated = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candlestickData = await fetchInitialCandlestickData(
          symbol,
          interval,
          50
        );

        setInitialCandlestickData(candlestickData);

        if (!signalsGenerated.current) {
          const initialSignals = generateInitialRandomSignals(
            candlestickData,
            7
          );
          setSignals(initialSignals);
          signalsGenerated.current = true;
        }

        setLoading(false);
      } catch (error) {
        console.log("Error fetching initial data:", error);
      }
    };

    fetchData();

    const ws = handleWebSocket(
      symbol,
      interval,
      setInitialCandlestickData,
      setSignals,
      fetchData,
      generateRandomSignals
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

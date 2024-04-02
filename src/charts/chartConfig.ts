import { Annotation, ChartOptions, Signal } from "../types/types";

export const optionsWithAnnotations = (signals: Signal[]): ChartOptions => {
  const annotations = signals.map((signal: Signal) => ({
    x: signal.x,
    borderColor: signal.type === "buy" ? "#00E396" : "#FF4560",
    label: {
      borderColor: signal.type === "buy" ? "#00E396" : "#FF4560",
      style: {
        color: "#fff",
        background: signal.type === "buy" ? "#00E396" : "#FF4560",
      },
      orientation: "horizontal",
      text: signal.type === "buy" ? "↑ Buy" : "↓ Sell",
    },
  }));

  return {
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: false,
      },
    },
    annotations: {
      xaxis: annotations as Annotation[],
    },
  };
};

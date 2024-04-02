export interface Signal {
  type: "buy" | "sell";
  x: number;
  y: number;
  volume: number;
}

export interface ChartProps {
  symbol: string;
  interval: string;
  limit?: number;
}

export interface CandleData {
  x: Date;
  y: number[];
}

interface AnnotationLabel {
  borderColor: string;
  borderWidth?: number;
  borderRadius?: number;
  text: string;
  textAnchor?: string;
  orientation: 'horizontal' | 'vertical';
  position?: string;
  offsetX?: number;
  offsetY?: number;
  style: {
    background: string;
    color: string;
    fontSize?: string;
    fontWeight?: number;
    cssClass?: string;
    padding?: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
  };
}

export interface Annotation {
  x: number;
  x2?: number | null;
  strokeDashArray?: number;
  fillColor?: string;
  borderColor: string;
  borderWidth?: number;
  opacity?: number;
  offsetX?: number;
  offsetY?: number;
  label: AnnotationLabel;
}

export interface ChartOptions {
  chart: {
    type: 'candlestick';
    height: number;
    toolbar: {
      show: boolean;
    };
  };
  xaxis: {
    type: 'datetime';
  };
  yaxis: {
    tooltip: {
      enabled: boolean;
    };
  };
  annotations: {
    xaxis: Annotation[];
  };
}

export type CandlestickData = [
  number, // Open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string  // Ignore
];

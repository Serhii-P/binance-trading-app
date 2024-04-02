declare module 'apexcharts' {
  export default class ApexCharts {
    constructor(el: any, options: any);
    render(): void;
    updateSeries(newSeries: any, animate?: boolean): void;
    updateOptions(newOptions: any, redrawPaths?: boolean, animate?: boolean): void;
    toggleSeries(seriesName: string): void;
    addXaxisAnnotation(options: any, pushToMemory?: boolean, context?: any): void;
    addYaxisAnnotation(options: any, pushToMemory?: boolean, context?: any): void;
    addPointAnnotation(options: any, pushToMemory?: boolean, context?: any): void;
    removeAnnotation(id: string, options?: any): void;
  }
}
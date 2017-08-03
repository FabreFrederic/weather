export class ValueCircleConfig {
  value: number;
  startAngle: number;
  endAngle: number;
  min: number;
  max: number;
  colorStops: Array<{value: number, color: string}>;
  serieName: string;
  tooltipValueSuffix: string;

  constructor() {
  }
}

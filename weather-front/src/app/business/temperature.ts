export class Temperature {
  temperature: number;
  date: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

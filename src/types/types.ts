export interface CurrencyData {
  ccy:string;
  base_ccy:string;
  buy:number;
  sale:number;

  [key: string]: string | number;
}
export interface CurrencyStore {
  currencyData: CurrencyData[];
  updateCurrency: (index: number, field: string, value: string | number) => void;
}

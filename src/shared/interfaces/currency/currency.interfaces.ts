export enum CurrencyEnum {
  EUR = 'EUR',
  RON = 'RON',
  MDL = 'MDL',
  USD = 'MDL'
}

export type CurrencyType = {
  amount: number;
  currency: CurrencyEnum;
};

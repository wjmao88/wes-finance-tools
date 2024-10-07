import type { MortgageBase } from "./mortgageListStore";

export const BASE_MORTGAGE_DEFAULT: MortgageBase = {
  name: "Default",
  principal: 750000,
  yearlyInterest: 0.0675,
  periodMonths: 360,
  extraMonthlyPayment: 0,
  extraInitialPayment: 0,
};

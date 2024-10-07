import { pmt } from "./calc";

export const calcMonthlyPayment = (
  principal: number,
  yearlyInterest: number,
  periodMonths: number
) => {
  return pmt(principal, yearlyInterest / 1200, periodMonths);
};

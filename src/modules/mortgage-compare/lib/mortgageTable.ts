import type { Accessor } from "solid-js";
import { mortgageListData, type MortgageBase } from "./mortgageListStore";

export type MortgageTableRow = {
  period: number;
  principalPayment: number;
  interestPayment: number;
  principalRemaining: number;
  totalPaid: number;
  newInvestment: number;
  investmentInterest: number;
  investmentTotal: number;
  balance: number;
};

export const calcTable = (index: Accessor<number>): MortgageTableRow[] => {
  const m = mortgageListData.baseList[index()];

  // @TODO could be triggering recalc since monthlyPayments is recreated
  const monthlyMortgagePayment = mortgageListData.monthlyPayments[index()];

  const initialInvestment =
    m.principal - mortgageListData.lowestPrincipal + m.extraInitialPayment;
  const monthlyInvestment =
    mortgageListData.highestMonthlyPayment -
    monthlyMortgagePayment +
    m.extraMonthlyPayment;

  const initialCondition: MortgageTableRow = {
    period: -1,
    principalPayment: 0,
    interestPayment: 0,
    principalRemaining: m.principal,
    totalPaid: 0,
    newInvestment: 0,
    investmentInterest: 0,
    investmentTotal: initialInvestment,
    balance: -m.principal + initialInvestment,
  };

  return new Array(mortgageListData.longestPeriod).fill(0).reduce(
    (all, _, index) => {
      return all.concat(
        calcTableRow(
          index,
          m,
          all[all.length - 1],
          monthlyMortgagePayment,
          monthlyInvestment,
          mortgageListData.investmentYearlyInterest
        )
      );
    },
    [initialCondition]
  );
};

export const calcTableRow = (
  period: number,
  m: MortgageBase,
  previousRow: MortgageTableRow,
  payment: number,
  investment: number,
  investmentYearlyInterest: number
): MortgageTableRow => {
  const interestPayment =
    (previousRow.principalRemaining * m.yearlyInterest) / 1200;
  const principalPayment = Math.min(
    payment - interestPayment,
    previousRow.principalRemaining
  );
  const monthTotalPayment = interestPayment + principalPayment;
  const principalLeft = previousRow.principalRemaining - principalPayment;
  const totalPaid = previousRow.totalPaid + monthTotalPayment;

  const newInvestment = investment + (payment - monthTotalPayment); // any extra goes to investment
  const investmentInterest =
    (previousRow.investmentTotal * investmentYearlyInterest) / 1200;
  const investmentTotal =
    previousRow.investmentTotal + newInvestment + investmentInterest;

  const balance = investmentTotal - principalLeft;

  return {
    period,
    principalPayment: principalPayment,
    interestPayment: interestPayment,
    principalRemaining: principalLeft,
    totalPaid,
    newInvestment,
    investmentInterest,
    investmentTotal,
    balance,
  };
};

export const mergeMortgageRows = (
  period: number,
  base: MortgageTableRow,
  next: MortgageTableRow
) => {
  return {
    // set as new
    period,

    // these are individual numbers, need to add
    principalPayment: base.principalPayment + next.principalPayment,
    interestPayment: base.interestPayment + next.interestPayment,
    newInvestment: base.newInvestment + next.newInvestment,
    investmentInterest: base.investmentInterest + next.investmentInterest,

    // these are totals, just use latest
    principalRemaining: next.principalRemaining,
    totalPaid: next.totalPaid,
    investmentTotal: next.investmentTotal,
    balance: next.balance,
  };
};

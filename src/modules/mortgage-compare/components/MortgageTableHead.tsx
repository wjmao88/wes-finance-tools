import {
  type Accessor,
  type Component,
  For,
  type ParentComponent,
  type VoidComponent,
} from "solid-js";
import type { CustomPartial } from "solid-js/store/types/store.js";
import MortgageEdit from "./MortgageEdit";
import { mortgageListData } from "../lib/mortgageListStore";
import TD from "@/components/table/TD";
import { calcTable, mergeMortgageRows } from "../lib/mortgageTable";
import { mortgageTableColumns } from "../lib/mortgageTableConfig";
import { categoryClasses } from "./MorgageTD";

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

const MortgageTableHead: VoidComponent = () => {
  const mortgageCounts = () =>
    [
      mortgageTableColumns.mortgageInterest,
      mortgageTableColumns.mortgagePrincipal,
      mortgageTableColumns.mortgageRemaining,
    ].filter((a) => !!a).length;

  const investmentCounts = () =>
    [
      mortgageTableColumns.investmentInterest,
      mortgageTableColumns.investmentNew,
      mortgageTableColumns.investmentTotal,
    ].filter((a) => !!a).length;

  return (
    <thead>
      <tr>
        <th></th>
        {mortgageCounts() && (
          <th class={categoryClasses.mortgage} colspan={mortgageCounts()}>
            mortgage
          </th>
        )}
        {investmentCounts() && (
          <th class={categoryClasses.investment} colspan={investmentCounts()}>
            investment
          </th>
        )}
        <th></th>
      </tr>
      <tr>
        {mortgageTableColumns.period && <th>period</th>}
        {mortgageTableColumns.mortgageInterest && (
          <th class={categoryClasses.mortgage}>interest</th>
        )}
        {mortgageTableColumns.mortgagePrincipal && (
          <th class={categoryClasses.mortgage}>principal</th>
        )}
        {mortgageTableColumns.mortgageRemaining && (
          <th class={categoryClasses.mortgage}>remaining</th>
        )}
        {mortgageTableColumns.investmentInterest && (
          <th class={categoryClasses.investment}>interest</th>
        )}
        {mortgageTableColumns.investmentNew && (
          <th class={categoryClasses.investment}>new</th>
        )}
        {mortgageTableColumns.investmentTotal && (
          <th class={categoryClasses.investment}>total</th>
        )}
        {mortgageTableColumns.balance && (
          <th class={categoryClasses.total}>balance</th>
        )}
        {/* <th>diff</th> */}
      </tr>
    </thead>
  );
};

export default MortgageTableHead;

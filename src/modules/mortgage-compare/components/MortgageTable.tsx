import {
  type Accessor,
  type Component,
  For,
  type ParentComponent,
} from "solid-js";
import type { CustomPartial } from "solid-js/store/types/store.js";
import MortgageEdit from "./MortgageEdit";
import { mortgageListData } from "../lib/mortgageListStore";
import TD from "@/components/table/TD";
import { calcTable, mergeMortgageRows } from "../lib/mortgageTable";

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

const MortgageTable: Component<{
  index: Accessor<number>;
}> = ({ index }) => {
  const monthly = () => calcTable(index);

  const yearlyTable = () => {
    return monthly().reduce<MortgageTableRow[]>((acc, month) => {
      const year = Math.floor(month.period / 12) + 1;
      if (acc[year]) {
        acc[year] = mergeMortgageRows(month.period, acc[year], month);
      } else {
        acc[year] = { ...month, period: month.period };
      }
      return acc;
    }, []);
  };

  console.log("???", yearlyTable().length);

  return (
    <div class="rounded border border-neutral-300 border-solid p-2">
      <table>
        <thead>
          <tr>
            <th></th>
            <th colspan={4}>mortgage</th>
            <th colspan={3}>investment</th>
            <th></th>
          </tr>
          <tr>
            <th>period</th>
            <th>interest</th>
            <th>principal</th>
            <th>remaining</th>
            <th>interest</th>
            <th>new</th>
            <th>total</th>
            <th>balance</th>
            {/* <th>diff</th> */}
          </tr>
        </thead>
        <tbody>
          <For each={yearlyTable()}>
            {(row, rowIndex) => {
              console.log(row);
              // const compareBalance =
              //   row.balance - baseTable()[rowIndex()].balance;
              return (
                <tr>
                  <TD>{row.period + 1}</TD>
                  <TD section>${row.interestPayment.toFixed(2)}</TD>
                  <TD>${row.principalPayment.toFixed(2)}</TD>
                  <TD>${row.principalRemaining.toFixed(2)}</TD>
                  <TD section>${row.investmentInterest.toFixed(2)}</TD>
                  <TD>${row.newInvestment.toFixed(2)}</TD>
                  <TD>${row.investmentTotal.toFixed(2)}</TD>
                  <TD section>${row.balance.toFixed(2)}</TD>
                  {/* <TD
                    class={
                      compareBalance > 0
                        ? "bg-green-300"
                        : compareBalance < 0
                        ? "bg-red-300"
                        : ""
                    }
                  >
                    {compareBalance !== 0 && ` $${compareBalance.toFixed(2)}`}
                  </TD> */}
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default MortgageTable;

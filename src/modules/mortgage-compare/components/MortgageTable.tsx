import { type Accessor, type Component, For } from "solid-js";
import { calcTable, mergeMortgageRows } from "../lib/mortgageTable";
import {
  mortgageTableColumns,
  mortgageTableGrouping,
} from "../lib/mortgageTableConfig";
import MortgageTD from "./MorgageTD";
import MortgageTableHead from "./MortgageTableHead";
import TD from "@/components/table/TD";

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

  const groupedTable = () => {
    const grouping = mortgageTableGrouping();
    return monthly().reduce<MortgageTableRow[]>((acc, month) => {
      const year = Math.floor(month.period / grouping) + 1;
      if (acc[year]) {
        acc[year] = mergeMortgageRows(month.period, acc[year], month);
      } else {
        acc[year] = { ...month, period: month.period };
      }
      return acc;
    }, []);
  };

  return (
    <table>
      <MortgageTableHead />
      <tbody>
        <For each={groupedTable()}>
          {(row, rowIndex) => {
            console.log(row);
            // const compareBalance =
            //   row.balance - baseTable()[rowIndex()].balance;
            return (
              <tr>
                {mortgageTableColumns.period && <TD>{row.period + 1}</TD>}
                {mortgageTableColumns.mortgageInterest && (
                  <MortgageTD category="mortgage" value={row.interestPayment} />
                )}
                {mortgageTableColumns.mortgagePrincipal && (
                  <MortgageTD
                    category="mortgage"
                    value={row.principalPayment}
                  />
                )}
                {mortgageTableColumns.mortgageRemaining && (
                  <MortgageTD
                    category="mortgage"
                    value={row.principalRemaining}
                  />
                )}
                {mortgageTableColumns.investmentInterest && (
                  <MortgageTD
                    category="investment"
                    value={row.investmentInterest}
                  />
                )}
                {mortgageTableColumns.investmentNew && (
                  <MortgageTD category="investment" value={row.newInvestment} />
                )}
                {mortgageTableColumns.investmentTotal && (
                  <MortgageTD
                    category="investment"
                    value={row.investmentTotal}
                  />
                )}
                {mortgageTableColumns.balance && (
                  <MortgageTD category="total" value={row.balance} />
                )}
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
  );
};

export default MortgageTable;

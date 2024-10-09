import { createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";

const [mortgageTableColumns, setMortgageTableColumns] = createStore({
  period: true,
  mortgageInterest: true,
  mortgagePrincipal: true,
  mortgageRemaining: true,
  investmentInterest: true,
  investmentNew: true,
  investmentTotal: true,
  balance: true,
});

export type MortgageTableColumn = keyof typeof mortgageTableColumns;
export { mortgageTableColumns };

export const toggleColumn = (name: keyof typeof mortgageTableColumns) => {
  setMortgageTableColumns(produce((c) => (c[name] = !c[name])));
};

export const [mortgageTableGrouping, setMortgageTableGrouping] =
  createSignal(12);

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
import { mortgageTableColumns } from "../lib/mortgageTableConfig";
import MortgageTableHead from "./MortgageTableHead";

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

export const categoryClasses = {
  mortgage: "bg-red-200",
  investment: "bg-green-200",
  total: "bg-blue-200",
};

const MortgageTD: Component<{
  category: "mortgage" | "investment" | "total";
  value: number;
}> = ({ category, value }) => {
  return (
    <TD class={categoryClasses[category]}>
      ${value.toFixed(2).replace("-0", "0")}
    </TD>
  );
};

export default MortgageTD;

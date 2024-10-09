import TextField from "@/components/fields/TextField";
import {
  mortgageListData,
  updateGlobalInvestmentInterest,
} from "../lib/mortgageListStore";
import NumberField from "@/components/fields/NumberField";
import MortgageTableColumnsSelector from "./MortgageTableColumnsSelector";
import MortgageTableGroupingSelector from "./MortgageTableGroupingSelector";
export const route = {};

const MortgageGlobalSummary = () => {
  return (
    <section>
      <div class="flex items-stretch gap-2">
        <div class="border rounded p-2">
          <div class="flex flex-col">
            <div class="text-xs mb-1">
              Assumed Initial Balance (Initial Investment - Mortgage)
            </div>
            <div class="py-1">
              $ {mortgageListData.lowestPrincipal.toFixed(2)}
            </div>
          </div>
        </div>
        <div class="border rounded p-2 ">
          <div class="flex flex-col">
            <div class="text-xs mb-1">
              Assumed Monthly Total (Payment + Investment)
            </div>
            <div class="py-1">
              $ {mortgageListData.highestMonthlyPayment.toFixed(2)}
            </div>
          </div>
        </div>
        <div class="border rounded p-2">
          <NumberField
            label="Investment Interest (Yearly, 1 is 1%)"
            value={() => mortgageListData.investmentYearlyInterest}
            onChange={updateGlobalInvestmentInterest}
          />
        </div>
        <div class="border rounded p-2">
          <div class="flex flex-col">
            <div class="text-xs mb-1">Table Columns</div>
            <MortgageTableColumnsSelector />
          </div>
        </div>{" "}
        <div class="border rounded p-2">
          <div class="flex flex-col">
            <div class="text-xs mb-1">Table Rows Grouping</div>
            <MortgageTableGroupingSelector />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageGlobalSummary;

import TextField from "@/components/fields/TextField";
import {
  mortgageListData,
  updateGlobalInvestmentInterest,
} from "../lib/mortgageListStore";
import NumberField from "@/components/fields/NumberField";
export const route = {};

const MortgageGlobalSummary = () => {
  return (
    <section>
      <div class="flex items-stretch gap-2">
        <div class="border rounded p-2 flex flex-col">
          <div class="text-xs mb-1">
            Assumed Initial Balance (Initial Investment - Mortgage)
          </div>
          <div>$ {mortgageListData.lowestPrincipal.toFixed(2)}</div>
        </div>
        <div class="border rounded p-2 flex flex-col">
          <div class="text-xs mb-1">
            Assumed Monthly Total (Payment + Investment)
          </div>
          <div>$ {mortgageListData.highestMonthlyPayment.toFixed(2)}</div>
        </div>

        <div class="border rounded p-2 flex items-center">
          <NumberField
            label="Investment Interest (Yearly, 1 is 1%)"
            value={() => mortgageListData.investmentYearlyInterest}
            onChange={updateGlobalInvestmentInterest}
          />
        </div>
      </div>
    </section>
  );
};

export default MortgageGlobalSummary;

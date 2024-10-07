import { createEffect } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type { CustomPartial } from "solid-js/store/types/store.js";
import { calcMonthlyPayment } from "@/libs/mortgage";
import { decodeData, encodeData } from "@/libs/paramCodec";
import { BASE_MORTGAGE_DEFAULT } from "./default";
import { on } from "solid-js";

export type MortgageBase = {
  name: string;
  principal: number;
  yearlyInterest: number;
  periodMonths: number;
  extraMonthlyPayment: number;
  extraInitialPayment: number;
};

const paramName = "mortgagecompare";

const getData = () =>
  decodeData<MortgageBase[]>(
    new URLSearchParams(window.location.search).get(paramName)
  );

const updateData = (data: MortgageBase[]) => {
  const params = new URLSearchParams(window.location.search);
  params.set(paramName, encodeData(data));
  window.history.replaceState(null, "", "?" + params.toString());
};

const [mortgageListData, setMortgageBases] = createStore({
  baseList: getData() || [BASE_MORTGAGE_DEFAULT],

  investmentYearlyInterest: 8,

  get monthlyPayments(): number[] {
    return this.baseList.map(
      (m) =>
        calcMonthlyPayment(m.principal, m.yearlyInterest, m.periodMonths) +
        m.extraMonthlyPayment
    );
  },

  get highestMonthlyPayment(): number {
    return Math.max(...this.monthlyPayments);
  },

  get longestPeriod(): number {
    return Math.max(...this.baseList.map((m) => m.periodMonths));
  },

  get lowestPrincipal(): number {
    return Math.min(...this.baseList.map((m) => m.principal));
  },
});

export { mortgageListData };

const baseListAccessor = () => mortgageListData.baseList;

createEffect(
  on(baseListAccessor, () => {
    console.log("effect");
    updateData(baseListAccessor());
  })
);

export const updateGlobalInvestmentInterest = (interest: number) => {
  setMortgageBases(produce((d) => (d.investmentYearlyInterest = interest)));
};

export const addNewMortgage = (index: number) => {
  setMortgageBases(
    produce((d) => {
      const template = d.baseList[index];
      const item = {
        ...template,
        name: template.name + " - copy",
      };
      d.baseList = d.baseList.toSpliced(index + 1, 0, item);
    })
  );
};

export const removeMortgage = (index: number) => {
  setMortgageBases(
    produce((data) => {
      data.baseList = data.baseList.toSpliced(index, 1);
    })
  );
};

export const updateMortgage = (
  index: number,
  update: (m: MortgageBase) => void
) => {
  setMortgageBases(
    produce((data) => {
      update(data.baseList[index]);
    })
  );
};

export const moveMortgage = (from: number, to: number) => {
  setMortgageBases(
    produce((data) => {
      const [item] = data.baseList.splice(from, 1);
      data.baseList = data.baseList.toSpliced(to, 0, item);
    })
  );
};

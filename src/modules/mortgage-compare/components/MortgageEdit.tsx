import type { ParentComponent, VoidComponent } from "solid-js";
import type { CustomPartial } from "solid-js/store/types/store.js";
import type { MortgageBase } from "@/libs/mortgage";
import NumberField from "../../../components/fields/NumberField";
import { mortgageListData, updateMortgage } from "../lib/mortgageListStore";
import TextField from "@/components/fields/TextField";
import type { Accessor } from "solid-js";

const EditRow: ParentComponent = ({ children }) => (
  <div class="p-1 mb-2 ">{children}</div>
);

const MortgageEdit: VoidComponent<{
  index: Accessor<number>;
}> = ({ index }) => {
  const mortgage = () => mortgageListData.baseList[index()];
  const field =
    <T extends keyof MortgageBase>(field: T) =>
    (): MortgageBase[T] =>
      mortgage()[field];

  const fieldUpdate =
    <T extends keyof MortgageBase>(field: T) =>
    (v: MortgageBase[T]) => {
      updateMortgage(index(), (m) => (m[field] = v));
    };
  return (
    <div>
      <EditRow>
        <TextField
          label="Name"
          value={field("name")}
          onChange={fieldUpdate("name")}
        />
      </EditRow>
      <EditRow>
        <NumberField
          label="Principal"
          value={field("principal")}
          onChange={fieldUpdate("principal")}
        />
      </EditRow>
      <EditRow>
        <NumberField
          label="Interest (Yearly, 1 is 1%)"
          value={field("yearlyInterest")}
          onChange={fieldUpdate("yearlyInterest")}
        />
      </EditRow>
      <EditRow>
        <NumberField
          label="Periods (Months)"
          value={field("periodMonths")}
          onChange={fieldUpdate("periodMonths")}
        />
      </EditRow>
      <EditRow>
        <NumberField
          label="Extra Payment (Monthly)"
          value={field("extraMonthlyPayment")}
          onChange={fieldUpdate("extraMonthlyPayment")}
        />
      </EditRow>
      <EditRow>
        <NumberField
          label="Extra Initial (Use negative for cost)"
          value={field("extraInitialPayment")}
          onChange={fieldUpdate("extraInitialPayment")}
        />
      </EditRow>
    </div>
  );
};

export default MortgageEdit;

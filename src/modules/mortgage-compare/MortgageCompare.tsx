import { createAutoAnimate } from "@formkit/auto-animate/solid";
import { For } from "solid-js";
import MortgageGlobalSummary from "./components/MortgageGlobalSummary";
import MortgagePanel from "./components/MortgagePanel";
import { mortgageListData, type MortgageBase } from "./lib/mortgageListStore";

export type MortgageCompareProps = {
  data: MortgageBase[] | null;
  updateData: (data: MortgageBase[]) => void;
};

export default function MortgageCompare() {
  const [parent] = createAutoAnimate(/* optional config */);
  return (
    <div class="p-3">
      <MortgageGlobalSummary />

      <div class="flex gap-4 mt-3" ref={parent}>
        <For each={mortgageListData.baseList}>
          {(_mortgage, index) => <MortgagePanel index={index} />}
        </For>
      </div>
    </div>
  );
}

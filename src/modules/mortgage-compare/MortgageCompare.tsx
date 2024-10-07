import { For } from "solid-js";
import MortgageControls from "./components/MortgageControls";
import MortgageEdit from "./components/MortgageEdit";
import { mortgageListData, type MortgageBase } from "./lib/mortgageListStore";
import MortgageGlobalSummary from "./components/MortgageGlobalSummary";
import { createAutoAnimate } from "@formkit/auto-animate/solid";
import Card from "@/components/Card/Card";
import MortgageTable from "./components/MortgageTable";

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
          {(_mortgage, index) => (
            <Card>
              <div class="flex flex-col align-center gap-2">
                <MortgageControls index={index} />
                <MortgageEdit index={index} />
                <hr class="my-5" />
                <MortgageTable index={index} />
              </div>
            </Card>
          )}
        </For>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DropdownMenuSubTriggerProps } from "@kobalte/core/dropdown-menu";
import { For } from "solid-js";
import {
  mortgageTableGrouping,
  setMortgageTableGrouping,
} from "../lib/mortgageTableConfig";

const options = [1, 12, 60];

const MortgageTableColumnsSelector = () => {
  return (
    <DropdownMenu placement="bottom">
      <DropdownMenuTrigger
        as={(props: DropdownMenuSubTriggerProps) => (
          <Button variant="outline" {...props}>
            {mortgageTableGrouping()} Months per row
          </Button>
        )}
      />
      <DropdownMenuContent class="w-56 bg-slate-50">
        <For each={options}>
          {(opt, index) => (
            <DropdownMenuCheckboxItem
              checked={opt === mortgageTableGrouping()}
              onChange={() => setMortgageTableGrouping(opt)}
            >
              {opt} months
            </DropdownMenuCheckboxItem>
          )}
        </For>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MortgageTableColumnsSelector;

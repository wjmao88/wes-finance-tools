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
  mortgageTableColumns,
  toggleColumn,
  type MortgageTableColumn,
} from "../lib/mortgageTableConfig";

const MortgageTableColumnsSelector = () => {
  const columns = () =>
    Object.keys(mortgageTableColumns) as MortgageTableColumn[];

  const selected = () => columns().filter((c) => mortgageTableColumns[c]);

  return (
    <DropdownMenu placement="bottom">
      <DropdownMenuTrigger
        as={(props: DropdownMenuSubTriggerProps) => (
          <Button variant="outline" {...props}>
            {selected().length} / {columns().length}
          </Button>
        )}
      />
      <DropdownMenuContent class="w-56 bg-slate-50">
        <For each={columns()}>
          {(name, index) => (
            <DropdownMenuCheckboxItem
              checked={mortgageTableColumns[name]}
              onChange={() => toggleColumn(name)}
            >
              {name}
            </DropdownMenuCheckboxItem>
          )}
        </For>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MortgageTableColumnsSelector;

import type { VoidComponent } from "solid-js";

import {
  addNewMortgage,
  moveMortgage,
  removeMortgage,
} from "../lib/mortgageListStore";
import type { Accessor } from "solid-js";
import Button from "@/components/buttons/Button";
import { Plus, Star, StarSolid, Trash } from "@/components/icons/icons";

const MortgageControls: VoidComponent<{
  index: Accessor<number>;
}> = ({ index }) => {
  return (
    <div class="flex gap-2 justify-between">
      <div class="flex items-center gap-2">
        {index() === 0 ? (
          <div class="fill-blue-700 stroke-blue-700 text-lg" title="Primary">
            <StarSolid />
          </div>
        ) : (
          <Button
            title="Make primary"
            size="icon"
            color="light"
            onClick={() => moveMortgage(index(), 0)}
          >
            <Star />
          </Button>
        )}
      </div>
      <div class="flex gap-2">
        {index() !== 0 && (
          <Button
            title="Delete"
            size="icon"
            color="red"
            onClick={() => removeMortgage(index())}
          >
            <Trash />
          </Button>
        )}
        <Button
          title="Create a copy"
          size="icon"
          color="green"
          onClick={() => addNewMortgage(index())}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default MortgageControls;

import Card from "@/components/Card/Card";
import { createAutoAnimate } from "@formkit/auto-animate/solid";
import { type Accessor, type VoidComponent } from "solid-js";
import MortgageControls from "./MortgageControls";
import MortgageEdit from "./MortgageEdit";
import MortgageTable from "./MortgageTable";

const MortgagePanel: VoidComponent<{
  index: Accessor<number>;
}> = ({ index }) => {
  const [parent] = createAutoAnimate(/* optional config */);
  return (
    <Card>
      <div class="flex flex-col align-center gap-2" ref={parent}>
        <MortgageControls index={index} />
        <MortgageEdit index={index} />
        <hr class="my-3" />
        <MortgageTable index={index} />
      </div>
    </Card>
  );
};

export default MortgagePanel;

import type { Accessor } from "solid-js";
import type { VoidComponent } from "solid-js";

const NumberField: VoidComponent<{
  label: string;
  value: Accessor<number>;
  onChange: (v: number) => void;
}> = ({ label, value, onChange }) => {
  return (
    <label class="flex flex-col">
      <span class="text-xs">{label}</span>
      <input
        class="rounded border border-neutral-300 border-solid p-1"
        type="number"
        value={value()}
        onChange={(e) => onChange(e.target.valueAsNumber)}
      />
    </label>
  );
};

export default NumberField;

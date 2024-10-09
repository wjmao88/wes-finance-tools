import type { Accessor } from "solid-js";
import type { VoidComponent } from "solid-js";

const TextField: VoidComponent<{
  label: string;
  value: Accessor<string>;
  onChange: (v: string) => void;
}> = ({ label, value, onChange }) => {
  return (
    <label class="flex flex-col">
      <span class="text-xs">{label}</span>
      <input
        class="rounded border border-neutral-300 border-solid px-2 p-1 h-8"
        type="text"
        value={value()}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export default TextField;

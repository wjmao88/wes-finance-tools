import type { ParentComponent } from "solid-js";

const TD: ParentComponent<{ class?: string; section?: boolean }> = ({
  children,
  section,
  ...props
}) => (
  <td
    class={`px-1 text-right ${
      section ? "border-l border-neutral-300 border-solid" : ""
    } ${props.class}`}
  >
    {children}
  </td>
);

export default TD;

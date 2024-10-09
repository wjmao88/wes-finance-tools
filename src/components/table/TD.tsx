import type { ParentComponent } from "solid-js";

const TD: ParentComponent<{ class?: string; section?: "left" | "right" }> = ({
  children,
  section,
  ...props
}) => (
  <td
    class={`px-1 text-right ${
      section ? " border-neutral-300 border-solid" : ""
    } ${
      section === "left" ? "border-l" : section === "right" ? "border-r" : ""
    } ${props.class}`}
  >
    {children}
  </td>
);

export default TD;

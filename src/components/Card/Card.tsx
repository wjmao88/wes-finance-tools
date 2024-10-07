import type { ParentComponent } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

const Card: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = ({
  class: className,
  children,
}) => (
  <div class={`card rounded shadow-lg p-3 border ${className}`}>{children}</div>
);

export default Card;

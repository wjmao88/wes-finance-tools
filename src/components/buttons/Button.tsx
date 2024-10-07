import type { ParentComponent } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

const BUTTON_TEMPLATES = {
  default: "text-center rounded focus:ring-4 focus:outline-none",
};

const BUTTON_SIZES = {
  icon: "p-1 fill-none",
  xs: "px-2 py-1 text-xs font-medium",
  sm: "px-2 py-1 font-medium",
  md: "px-3 py-2 font-medium",
  lg: "px-5 py-3 text-base font-medium ",
  xl: "px-6 py-3.5 text-base font-medium",
};

const BUTTON_COLORS = {
  default:
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  alternative:
    "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
  dark: "text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
  light:
    "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
  green:
    " text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
  red: " text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
  yellow:
    " text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:focus:ring-yellow-900",
  purple:
    " text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",
};

export type ButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  color?: keyof typeof BUTTON_COLORS;
  size?: keyof typeof BUTTON_SIZES;
};

const Button: ParentComponent<ButtonProps> = (props) => {
  const colorClass = BUTTON_COLORS[props.color ?? "default"];
  const sizeClass = BUTTON_SIZES[props.size ?? "md"];
  return (
    <button
      {...props}
      class={`${BUTTON_TEMPLATES.default} ${colorClass} ${sizeClass} ${props.class}`}
    />
  );
};

export default Button;

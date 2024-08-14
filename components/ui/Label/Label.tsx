import cn  from "clsx";
import { ReactNode } from "react";

interface LabelProps {
  children: ReactNode;
  color?: "green" | "blue" | "orange" | "purple" | "pink";
  pill?: boolean;
  nomargin?: boolean;
}

const Label: React.FC<LabelProps> = (props) => {
  const color = {
    green: "text-emerald-700",
    blue: "text-blue",
    orange: "text-orange-700",
    purple: "text-purple",
    pink: "text-pink",
  };

  const bgcolor = {
    green: "bg-emerald-50",
    blue: "bg-blue",
    orange: "bg-orange-50",
    purple: "bg-purple",
    pink: "bg-pink",
  };

  const margin = props.nomargin;

  if (props.pill) {
    return (
      <div
        className={
          "inline-flex items-center justify-center font-bold px-2 h-6 text-sm bg-blue text-blue rounded-full shrink-0"
        }
      >
        {props.children}
      </div>
    );
  }

  return (
    <span
      className={cn(
        "inline-block text-xs font-medium tracking-wider uppercase",
        !margin && "mt-5",
        color[props.color || "pink"] || color["pink"]
      )}
    >
      {props.children}
    </span>
  );
};

export default Label;

import React from "react";

type Props = {
  items: string[];
  align?: "left" | "center";
  className?: string;
};

export default function TagList({ items, align = "center", className = "" }: Props) {
  return (
    <div
      className={`chips ${align === "center" ? "chips-hero" : "chips-card"} ${className}`}
      role="list"
    >
      {items.map((t) => (
        <span key={t} className="chip" role="listitem">
          {t}
        </span>
      ))}
    </div>
  );
}

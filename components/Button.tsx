import React, { ReactNode } from "react";

type Variant =
  | "cta1"                 // filled → outline on hover → pressed inner tint
  | "cta2"                 // outline → filled on hover → pressed inner tint
  // kept for backward-compat with any older usage:
  | "filled"
  | "outlined"
  | "tonal"
  | "ghost"
  | "filled-to-ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  icon?: string;                       // Material Symbols name (optional)
  as?: React.ElementType;              // polymorphic (a, button, Link, etc.)
  href?: string;                       // for <a>
  to?: string;                         // for routers
  target?: string;
  rel?: string;
  download?: boolean | string;         // for <a download>
  className?: string;
}

/**
 * Button
 * - Variants "cta1" and "cta2" implement the exact interactions Daniel specified.
 * - Uses CSS classes defined in index.css (see step 2 below).
 * - Polymorphic via `as` (defaults to 'button'); auto-works with <a>, React Router, etc.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "cta1",
  icon,
  as,
  href,
  to,
  className = "",
  ...rest
}) => {
  const Component = (as ?? (href ? "a" : "button")) as React.ElementType;

  // map legacy variants to sane defaults so older code doesn't break
  const normalized: Variant =
    variant === "filled" ? "cta1"
    : variant === "outlined" ? "cta2"
    : variant === "filled-to-ghost" ? "cta1"
    : variant; // cta1 | cta2 | tonal | ghost

  const vClass =
    normalized === "cta1" ? "btn-cta1"
    : normalized === "cta2" ? "btn-cta2"
    : normalized === "tonal" ? "btn-tonal"
    : normalized === "ghost" ? "btn-ghost"
    : "btn-cta1";

  const classes = `btn ${vClass} ${className}`.trim();

  const content = (
    <>
      {icon ? (
        <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 18, marginRight: 6 }}>
          {icon}
        </span>
      ) : null}
      {children}
    </>
  );

  // pass through unknown props (polymorphic)
  const allProps = {
    ...rest,
    href,
    to,
    className: classes,
  };

  return <Component {...(allProps as any)}>{content}</Component>;
};

export default Button;

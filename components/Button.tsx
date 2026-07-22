import React, { ReactNode } from "react";

type Variant =
  | "cta1"
  | "cta2"
  | "filled"
  | "outlined"
  | "tonal"
  | "ghost"
  | "filled-to-ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  icon?: string;
  as?: React.ElementType;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  className?: string;
}

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

  const normalized: Variant =
    variant === "filled" ? "cta1"
    : variant === "outlined" ? "cta2"
    : variant === "filled-to-ghost" ? "cta1"
    : variant;

  const vClass =
    normalized === "cta1" ? "btn-cta1"
    : normalized === "cta2" ? "btn-cta2"
    : normalized === "tonal" ? "btn-tonal"
    : normalized === "ghost" ? "btn-ghost"
    : "btn-cta1";

  const allProps = {
    ...rest,
    href,
    to,
    className: `btn ${vClass} ${className}`.trim(),
  };

  return (
    <Component {...(allProps as any)}>
      {icon ? <span className="btn__icon" aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </Component>
  );
};

export default Button;

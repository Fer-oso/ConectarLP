import { Link } from "react-router-dom";

import "./styles/ButtonGhostStyles.css";

export function ButtonGhost({
  className,
  to,
  target,
  children,
}: {
  className?: string;
  to: string;
  target?: string;
  children: React.ReactNode;
}) {
  return (
    <Link className={className} to={to} target={target}>
      {children}
    </Link>
  );
}

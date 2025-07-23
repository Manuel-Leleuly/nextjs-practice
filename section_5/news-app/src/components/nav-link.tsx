"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

export const NavLink = ({ href, children }: Props) => {
  const path = usePathname();

  return (
    <Link href={href} className={classNames({ active: path.startsWith(href) })}>
      {children}
    </Link>
  );
};

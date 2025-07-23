"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import styles from "./nav-link.module.css";

interface Props {
  href: string;
  children: ReactNode;
}

export const NavLink = ({ href, children }: Props) => {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={classNames(styles.link, {
        [styles.active]: path.startsWith(href),
      })}
    >
      {children}
    </Link>
  );
};

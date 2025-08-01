import logoPng from "@assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { MainHeaderBackground } from "./main-header-background";
import styles from "./main-header.module.css";
import { NavLink } from "./nav-link";

export const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          <Image src={logoPng} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browser Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

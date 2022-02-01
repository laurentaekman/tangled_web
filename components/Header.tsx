import { Fragment } from "react";
import Link from "next/link";
import { HeartUnfilledIcon } from "../assets/HeartUnfilledIcon";
import { HomeIcon } from "../assets/HomeIcon";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <a className={styles.link}>
          <HomeIcon />
          Home
        </a>
      </Link>
      <div className={styles.header_text}>
        <h1>Tangled Web (Art Edition)</h1>
      </div>
      <Link href="/">
        <a className={styles.link}>
          <HeartUnfilledIcon />
          Favorites
        </a>
      </Link>
    </div>
  );
};

export default Header;

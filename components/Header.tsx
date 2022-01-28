import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <a className={styles.link}>Home</a>
      </Link>
      <div className={styles.header_text}>
        <h1>Tangled Web (Art Edition)</h1>
      </div>
      <Link href="/">
        <a className={styles.link}>Favorites</a>
      </Link>
    </div>
  );
};

export default Header;

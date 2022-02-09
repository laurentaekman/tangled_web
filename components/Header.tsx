import Link from "next/link";
import { HeartUnfilledIcon } from "../assets/HeartUnfilledIcon";
import { HomeIcon } from "../assets/HomeIcon";
import { PaintBrushIcon } from "../assets/PaintBrushIcon";
import { PaletteIcon } from "../assets/PaletteIcon";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/home">
        <a className={styles.link}>
          <HomeIcon />
          Home
        </a>
      </Link>
      <div className={styles.header_text}>
        <Link href="/">
          <a>
            <h1>
              Art Crawl
              <PaletteIcon />
              <PaintBrushIcon />
            </h1>
          </a>
        </Link>
      </div>
      <Link href="/favorites">
        <a className={styles.link}>
          <HeartUnfilledIcon />
          Favorites
        </a>
      </Link>
    </div>
  );
};

export default Header;

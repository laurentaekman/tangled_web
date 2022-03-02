import Link from "next/link";
import { HeartUnfilledIcon } from "../assets/HeartUnfilledIcon";
import { HomeIcon } from "../assets/HomeIcon";
import { PaintBrushIcon } from "../assets/PaintBrushIcon";
import { PaletteIcon } from "../assets/PaletteIcon";
import styles from "../styles/components/Header.module.css";

const Header = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.header_items}>
        <div className={styles.header_text}>
          <Link href="/">
            <a>
              <h1>
                Art Crawl
                <div>
                  <PaletteIcon />
                  <PaintBrushIcon />
                </div>
              </h1>
            </a>
          </Link>
        </div>
        <div className={styles.links}>
          <Link href="/home">
            <a className={styles.link}>
              <HomeIcon />
              Home
            </a>
          </Link>
          <Link href="/favorites">
            <a className={styles.link}>
              <HeartUnfilledIcon />
              Favorites
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;

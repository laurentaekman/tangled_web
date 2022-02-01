import { Fragment, useState } from "react";
import Link from "next/link";
import { HeartUnfilledIcon } from "../assets/HeartUnfilledIcon";
import { HomeIcon } from "../assets/HomeIcon";
import styles from "../styles/Header.module.css";
import { useFavorites } from "../hooks/use-favorites";
import { Modal } from "./Modal";

const Header = () => {
  const [favorites, addFavorite, removeFavorite] = useFavorites();
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
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
        <button
          className={styles.link}
          onClick={() => setShowModal(!showModal)}
        >
          <HeartUnfilledIcon />
          Favorites
        </button>
      </div>
      {showModal && (
        <Modal favorites={favorites} removeFavorite={removeFavorite} />
      )}
    </Fragment>
  );
};

export default Header;

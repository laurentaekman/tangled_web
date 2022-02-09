import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import { HeartFilledIcon } from "../assets/HeartFilledIcon";
import { HeartUnfilledIcon } from "../assets/HeartUnfilledIcon";
import { RightArrowIcon } from "../assets/RightArrowIcon";
import { ArtObject } from "../utils/types";
import { truncateString } from "../utils/text";
import styles from "../styles/Favorites.module.css";

interface Props {
  item: ArtObject;
  removeFavorite: (objectId: number) => void;
}

export const FavoritesRow = ({ item, removeFavorite }: Props) => {
  const [isFavorited, setIsFavorited] = useState(true);

  return (
    <CSSTransition in={isFavorited} timeout={200} classNames={{ ...styles }}>
      <div className={styles.favorites_row}>
        <div className={styles.favorites_row_text}>
          <p className={styles.favorites_object_name}>
            {truncateString(item.title, 5)}
          </p>
          <p>{item.artistName}</p>
        </div>

        {item.imageSource && (
          <div className={styles.favorites_cropped_image}>
            <img src={item.imageSource} alt={item.objectName} />
          </div>
        )}
        <div className={styles.favorites_action_items}>
          <button
            aria-label="remove favorite"
            onClick={() => {
              setIsFavorited(false);
              removeFavorite(item.id);
            }}
          >
            {isFavorited && <HeartFilledIcon />}
            {!isFavorited && <HeartUnfilledIcon />}
          </button>
          <Link href={`/art-posts/${item.id}`}>
            <a aria-label="go to favorite's page">
              <RightArrowIcon />
            </a>
          </Link>
        </div>
      </div>
    </CSSTransition>
  );
};

import Link from "next/link";
import { HeartFilledIcon } from "../assets/HeartFilledIcon";
import { RightArrowIcon } from "../assets/RightArrowIcon";
import { ArtObject } from "../pages/art-posts/[objectId]";
import styles from "../styles/Favorites.module.css";

interface Props {
  item: ArtObject;
  removeFavorite: (objectId: number) => void;
}

export const FavoritesRow = ({ item, removeFavorite }: Props) => {
  return (
    <div className={styles.favorites_row}>
      <div className={styles.favorites_row_text}>
        <p className={styles.favorites_object_name}>{item.objectName}</p>
        <p>{item.artistName}</p>
      </div>

      {item.imageSource && (
        <div className={styles.favorites_cropped_image}>
          <img src={item.imageSource} alt={item.objectName} />
        </div>
      )}
      <div className={styles.favorites_action_items}>
        <button onClick={() => removeFavorite(item.id)}>
          <HeartFilledIcon />
        </button>
        <Link href={`/art-posts/${item.id}`}>
          <a>
            <RightArrowIcon />
          </a>
        </Link>
      </div>
    </div>
  );
};

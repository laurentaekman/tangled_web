import { HeartFilledIcon } from "../assets/HeartFilledIcon";
import { ArtObject } from "../pages/art-posts/[objectId]";
import styles from "../styles/Modal.module.css";

interface Props {
  item: ArtObject;
  removeFavorite: (objectId: number) => void;
}

export const ModalRow = ({ item, removeFavorite }: Props) => {
  return (
    <div className={styles.modal_row}>
      <div className={styles.modal_action_items}>
        <div>{item.objectName}</div>
        <button onClick={() => removeFavorite(item.id)}>
          <HeartFilledIcon />
        </button>
      </div>
      {item.imageSource && (
        <div className={styles.modal_cropped_image}>
          <img src={item.imageSource} alt={item.objectName} />
        </div>
      )}
    </div>
  );
};

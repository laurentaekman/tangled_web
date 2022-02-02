import { ArtObject } from "../utils/types";
import { ModalRow } from "./ModalRow";
import styles from "../styles/Modal.module.css";

interface Props {
  favorites: ArtObject[];
  removeFavorite: (objectId: number) => void;
}

export const Modal = ({ favorites, removeFavorite }: Props) => {
  return (
    <div className={styles.modal}>
      <h2>Favorites</h2>
      {favorites.map((favorite) => (
        <ModalRow
          item={favorite}
          removeFavorite={removeFavorite}
          key={favorite.id}
        />
      ))}
      {favorites.length <= 0 && <div>You have no favorites!</div>}
    </div>
  );
};

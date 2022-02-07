import Link from "next/link";
import { QuestionIcon } from "../assets/QuestionIcon";
import { truncateString } from "../utils/text";
import styles from "../styles/ArtObjectCard.module.css";
import { ArtObject } from "../utils/types";

interface Props {
  artObject: ArtObject;
}

export default function ArtObjectCard({ artObject }: Props) {
  const id = artObject.id;
  return (
    <div className={styles.card}>
      <Link href={`/art-posts/${id}`} passHref>
        <div className={styles.card_items}>
          <h2>{truncateString(artObject.title, 5)}</h2>
          {artObject.artistName && <p>by: {artObject.artistName}</p>}

          {artObject.imageSource && (
            <div className={styles.cropped_image}>
              <img src={artObject.imageSource} alt={artObject.title}></img>
            </div>
          )}
          {!artObject.imageSource && (
            <div className={styles.card_no_image}>
              <QuestionIcon />
              <div>No image found!</div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

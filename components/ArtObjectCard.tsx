import Link from "next/link";
import { QuestionIcon } from "../assets/QuestionIcon";
import { truncateString } from "../utils/text";
import styles from "../styles/ArtObjectCard.module.css";

interface Props {
  artObject: any;
}

export default function ArtObjectCard({ artObject }: Props) {
  const id = artObject?.objectID;
  return (
    <div className={styles.card}>
      <Link href={`/art-posts/${id}`} passHref>
        <div className={styles.card_items}>
          <h2>{truncateString(artObject.title, 5)}</h2>
          {artObject.artistDisplayName && (
            <p>by: {artObject.artistDisplayName}</p>
          )}
          {artObject.primaryImageSmall && (
            <div className={styles.cropped_image}>
              <img
                src={artObject.primaryImageSmall}
                alt={artObject.title}
              ></img>
            </div>
          )}
          {!artObject.primaryImageSmall && (
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

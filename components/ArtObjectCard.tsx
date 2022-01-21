import Link from "next/link";
import styles from "../styles/ArtObjectCard.module.css";

interface Props {
  artObject: any;
}

export default function ArtObjectCard({ artObject }: Props) {
  const id = artObject?.objectID;
  return (
    <div className={styles.card}>
      <Link href={`/art-posts/${id}`} passHref>
        <div>
          <h2>{artObject.title}</h2>
          {artObject.artistDisplayName && (
            <p>by: {artObject.artistDisplayName}</p>
          )}
          {artObject.primaryImageSmall && (
            <img src={artObject.primaryImageSmall} alt={artObject.title}></img>
          )}
        </div>
      </Link>
    </div>
  );
}

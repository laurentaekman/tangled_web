import { PaletteIcon } from "../assets/PaletteIcon";
import styles from "../styles/components/EmptyState.module.css";

interface Props {
  message: string;
  secondaryMessage?: string;
}

export const EmptyState = ({ message, secondaryMessage }: Props) => {
  return (
    <div className={styles.empty_state}>
      <PaletteIcon />
      <h2>{message}</h2>
      {secondaryMessage && <div>{secondaryMessage}</div>}
    </div>
  );
};

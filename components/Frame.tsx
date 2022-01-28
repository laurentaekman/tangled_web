import Image from "next/image";
import styles from "./Frame.module.css";

interface Props {
  children: any;
  dimensions: any;
  className?: string;
}
export default function Frame({ children, dimensions, className }: Props) {
  const height = dimensions.height ?? "900";
  const width = dimensions.width ?? "1068";
  return (
    <div className={styles.frame}>
      <Image
        src="https://www.onlygfx.com/wp-content/uploads/2020/01/gold-picture-frame-6.png"
        alt="gold frame"
        height={height}
        width={width}
      />
      <div className={className ?? ""}>{children}</div>
    </div>
  );
}

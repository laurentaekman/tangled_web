import Image from "next/image";
import { Fragment } from "react";

interface Props {
  children: any;
  dimensions: any;
  className?: string;
}
export default function Frame({ children, dimensions, className }: Props) {
  const height = dimensions.height ?? "900";
  const width = dimensions.width ?? "1068";
  return (
    <Fragment>
      <Image
        src="https://www.onlygfx.com/wp-content/uploads/2020/01/gold-picture-frame-6.png"
        alt="gold frame"
        height={height}
        width={width}
      />
      {/* <img
        src="https://i.dlpng.com/static/png/5900460-gold-frame-png-transparent-image-png-arts-picture-frame-png-transparent-500_381_preview.png"
        alt="gold frame"
      ></img> */}
      <div className={className ?? ""}>{children}</div>
    </Fragment>
  );
}

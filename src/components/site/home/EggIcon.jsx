
import { forwardRef } from "react";

export const EggIcon = forwardRef(function EggIcon(
  { style, ...props },
  ref
) {
  return (
    <img
      ref={ref}
      src="/images/egg5.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      {...props}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "contain",
        userSelect: "none",
        ...style,
      }}
    />
  );
});

export const EggCartonIcon = EggIcon;

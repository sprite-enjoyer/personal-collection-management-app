import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { topics } from "../../misc/constants";
import { CSSProperties } from "@mui/material/styles/createMixins";
import { Typography } from "@mui/material";
import "./cursor.css";

interface ChangingHeaderProps {
  style: CSSProperties;
}
const strings = topics.slice(0, -1);
const ChangingHeader = ({ style }: ChangingHeaderProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const typed = new Typed(ref.current, {
      strings: strings,
      typeSpeed: 40,
      backDelay: 2000,
      backSpeed: 30,
      shuffle: true,
      smartBackspace: false,
    });

    return () => typed.destroy();
  }, []);

  return (
    <Typography
      style={{ ...style, marginRight: "-20px", color: "#0072d6" }}
      ref={ref}
    />
  );
};

export default ChangingHeader;

import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { englishTopics } from "../../misc/constants";
import { georgianTopics } from "../../misc/constants";
import { CSSProperties } from "@mui/material/styles/createMixins";
import { Typography } from "@mui/material";
import "./cursor.css";
import { useLanguageContext } from "../../misc/language";

interface ChangingHeaderProps {
  style: CSSProperties;
}
const ChangingHeader = ({ style }: ChangingHeaderProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const { language } = useLanguageContext();
  const strings = (language === "English" ? englishTopics : georgianTopics).slice(0, -1);

  useEffect(() => {
    const typed = new Typed(ref.current, {
      strings: strings,
      typeSpeed: 40,
      loop: true,
      backDelay: 2500,
      backSpeed: 30,
      shuffle: true,
      smartBackspace: false,
    });

    return () => typed.destroy();
  }, [language]);

  return (
    <Typography
      style={{ ...style, marginRight: "-20px", color: "#0072d6" }}
      ref={ref}
    />
  );
};

export default ChangingHeader;

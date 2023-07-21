import { Box, Typography } from "@mui/material";
import { useScreenSizeContext } from "../misc/screenSize";
import { Link } from "react-router-dom";
import { useThemeContext } from "../misc/theme";
import { useLanguageContext } from "../misc/language";

const ErrorComponent = () => {
  const { userHasSmallScreen } = useScreenSizeContext();
  const { theme } = useThemeContext();
  const {
    staticTextObject: {
      ErrorComponent: { header1, header2, header3, link1text, link2text },
    },
  } = useLanguageContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "50px", alignItems: "center" }}>
      <Typography
        color={theme.palette.text.primary}
        variant={userHasSmallScreen ? "h5" : "h2"}>
        {header1}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography
          color={theme.palette.text.primary}
          variant={userHasSmallScreen ? "h6" : "h4"}>
          {header2}
          <Link to={"/"}>{link1text}</Link>
        </Typography>
        <Typography
          color={theme.palette.text.primary}
          variant={userHasSmallScreen ? "h6" : "h4"}>
          {header3} <Link to={"/register"}>{link2text}</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorComponent;

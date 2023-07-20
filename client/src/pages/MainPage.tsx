import { useLoaderData, useNavigate } from "react-router-dom";
import { Collection, ItemCardItem } from "../misc/types";
import axios from "axios";
import LatestItemsList from "../components/MainPage/LatestItemsList";
import CollectionList from "../components/CollectionList";
import { Box, Typography, useMediaQuery } from "@mui/material";
import ChangingHeader from "../components/MainPage/ChangingHeader";
import { CSSProperties } from "@mui/material/styles/createMixins";
import TagCloud from "../components/MainPage/TagCloud";
import { useThemeContext } from "../misc/theme";
import { useLanguageContext } from "../misc/language";
import { useScreenSizeContext } from "../misc/screenSize";
import { useMemo } from "react";

export const fetchLatestItems = async () => {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/items/getLatest/5`);
  const { data } = await response.data;
  return data;
};

export const fetchLargestCollection = async () => {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/collections/largest/5`);
  const { data } = await response.data;
  return data;
};

export const fetchAllTags = async () => {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/items/tags`);
  const { data } = await response.data;
  return data;
};

const MainPage = () => {
  const [latestItems, largestCollections, tags] = useLoaderData() as [ItemCardItem[], Collection[], string[]];
  const { theme } = useThemeContext();
  const {
    staticTextObject: {
      MainPage: { header1, header2, header3 },
    },
  } = useLanguageContext();
  const { userHasSmallScreen } = useScreenSizeContext();

  const headerTextStyles: CSSProperties = useMemo(() => {
    return {
      fontSize: userHasSmallScreen ? "1em" : "2.5em",
      padding: "0",
      margin: "0",
      display: "inline",
    };
  }, [userHasSmallScreen]);

  return (
    <Box
      style={{
        padding: "0px 5% 50px 5%",
        boxSizing: "border-box",
        overflow: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
      }}>
      <Box
        display={"flex"}
        gap={userHasSmallScreen ? "5px" : "20px"}>
        <Typography
          color={theme.palette.text.primary}
          sx={headerTextStyles}>
          {header1}
        </Typography>
        <ChangingHeader style={headerTextStyles} />
      </Box>
      <Box
        sx={
          userHasSmallScreen
            ? {
                display: "flex",
                flexDirection: userHasSmallScreen ? "column" : "row",
                alignItems: "center",
              }
            : {
                display: "flex",
              }
        }>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            flex: "3 3",
          }}>
          <Typography
            maxWidth={"100%"}
            color={theme.palette.text.primary}
            variant={userHasSmallScreen ? "h6" : "h5"}>
            {header2}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              padding: "20px 0",
              maxWidth: "90%",
            }}>
            <CollectionList
              collections={largestCollections}
              showImage={false}
            />
          </Box>
          <Typography
            maxWidth={"100%"}
            color={theme.palette.text.primary}
            variant={userHasSmallScreen ? "h6" : "h5"}>
            {header3}
          </Typography>
          <Box
            sx={{
              display: "flex",
              maxWidth: "90%",
              gap: "10px 30px",
              flexWrap: "wrap",
            }}>
            <LatestItemsList items={latestItems} />
          </Box>
        </Box>
        <Box
          sx={
            userHasSmallScreen
              ? { marginTop: "50px" }
              : {
                  flex: "2 2",
                  maxWidth: "50%",
                  maxHeight: "100%",
                  padding: "5%",
                }
          }>
          {userHasSmallScreen && <Typography color={theme.palette.text.primary}>Tags:</Typography>}
          <TagCloud tags={tags} />
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;

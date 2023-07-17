import { useLoaderData, useNavigate } from "react-router-dom";
import { Collection, ItemCardItem } from "../misc/types";
import axios from "axios";
import LatestItemsList from "../components/MainPage/LatestItemsList";
import CollectionList from "../components/CollectionList";
import { Box, Chip, Typography } from "@mui/material";
import ChangingHeader from "../components/MainPage/ChangingHeader";
import { CSSProperties } from "@mui/material/styles/createMixins";
import TagCloud from "../components/MainPage/TagCloud";

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

const headerTextStyles: CSSProperties = {
  fontSize: "4em",
  padding: "0",
  margin: "0",
  display: "inline",
};

const MainPage = () => {
  const [latestItems, largestCollections, tags] = useLoaderData() as [ItemCardItem[], Collection[], string[]];
  const navigate = useNavigate();

  return (
    <Box
      style={{
        padding: "0px 5% 0px 5%",
        boxSizing: "border-box",
        overflow: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
      }}>
      <Box
        display={"flex"}
        gap={"20px"}>
        <Typography
          maxWidth={"100%"}
          sx={headerTextStyles}>
          Collect and view
        </Typography>
        <ChangingHeader style={headerTextStyles} />
      </Box>
      <Box
        sx={{
          display: "flex",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            flex: "3 3",
          }}>
          <Typography
            maxWidth={"100%"}
            variant="h4">
            Here are some huge collections:
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
            variant="h4">
            Recently added items:
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
          sx={{
            flex: "2 2",
            maxWidth: "50%",
            maxHeight: "100%",
            padding: "5%",
            overflow: "clip",
          }}>
          <TagCloud tags={tags} />
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;

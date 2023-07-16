import { useLoaderData, useNavigate } from "react-router-dom";
import { Collection, ItemCardItem } from "../misc/types";
import axios from "axios";
import { routeBaseStyles } from "../misc/styleUtils";
import LatestItemsList from "../components/MainPage/LatestItemsList";
import CollectionList from "../components/CollectionList";
import { Box, Chip, Typography } from "@mui/material";
import ChangingHeader from "../components/MainPage/ChangingHeader";
import { CSSProperties } from "@mui/material/styles/createMixins";

export const fetchLatestItems = async () => {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/items/getLatest/12`);
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
    <div
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
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              gap: "10px",
              flexWrap: "wrap",
              padding: "20px 0",
              maxWidth: "90%",
            }}>
            <CollectionList collections={largestCollections} />
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
              gap: "10px",
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
            padding: "10%",
            overflow: "clip",
          }}>
          {tags.map((tag) => (
            <Chip
              component={"button"}
              onClick={() => navigate(`/TODO`)}
              clickable
              label={tag}
              key={tag}
              size="medium"
              sx={{
                color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 40%)`,
                fontSize: "1.2em",
                margin: "5px",
              }}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default MainPage;

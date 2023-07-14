import { useLoaderData } from "react-router-dom";
import { Collection, Item, ItemCardItem } from "../misc/types";
import axios from "axios";
import { routeBaseStyles } from "../misc/styleUtils";
import LatestItemsList from "../components/MainPage/LatestItemsList";
import CollectionList from "../components/CollectionList";
import { Box, Typography } from "@mui/material";
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

const headerTextStyles: CSSProperties = {
  fontSize: "4em",
  padding: "0",
  margin: "0",
};

const MainPage = () => {
  const [latestItems, largestCollections] = useLoaderData() as [ItemCardItem[], Collection[]];

  return (
    <div style={{ ...routeBaseStyles, display: "flex", flexDirection: "column", gap: "50px", paddingLeft: "5%" }}>
      <Box
        display={"flex"}
        gap={"20px"}>
        <Typography sx={headerTextStyles}>Collect and view</Typography>
        <ChangingHeader style={headerTextStyles} />
      </Box>
      <Typography variant="h3">Here are some huge collections:</Typography>
      <Box
        sx={{
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          maxWidth: "50%",
        }}>
        <CollectionList collections={largestCollections} />
      </Box>

      <Typography variant="h3">Recently added items:</Typography>
      <Box
        display={"grid"}
        gridTemplateColumns={"1fr 1fr 1fr 1fr"}
        flexDirection={"column"}
        gap={"5px"}
        maxWidth={"50%"}>
        <LatestItemsList items={latestItems} />
      </Box>
    </div>
  );
};

export default MainPage;

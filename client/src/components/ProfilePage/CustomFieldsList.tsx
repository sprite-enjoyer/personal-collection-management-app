import { Box, IconButton, Typography } from "@mui/material";
import CollectionConfigStore from "../../stores/CollectionConfigStore";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { useThemeContext } from "../../misc/theme";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface CustomFieldsListProps {
  collectionConfigStore: CollectionConfigStore;
}

interface CustomFieldInfoRowProps {
  name: string;
  type: string;
  deleteField: () => void;
}

const CustomFieldInfoRow = ({ name, type, deleteField }: CustomFieldInfoRowProps) => {
  const { theme } = useThemeContext();
  return (
    <Box
      key={name}
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        color: theme.palette.text.secondary,
      }}>
      <Box sx={{ flex: "1 1", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "10px" }}>
        <IconButton onClick={deleteField}>
          <RemoveCircleOutlineIcon sx={{ color: "#c23636" }} />
        </IconButton>
        <Typography fontSize={"1.2em"}>{name}:</Typography>
      </Box>
      <Box sx={{ flex: "1 1", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography fontSize={"1.2em"}>{type}</Typography>
      </Box>
    </Box>
  );
};

const CustomFieldsList = ({ collectionConfigStore }: CustomFieldsListProps) => {
  return (
    <>
      {collectionConfigStore.collection.additionalFieldsInfo.map((info) => (
        <CustomFieldInfoRow
          key={info._id}
          {...info}
          deleteField={() => collectionConfigStore.removeAdditionalFieldById(info._id)}
        />
      ))}
    </>
  );
};

export default observer(CustomFieldsList);

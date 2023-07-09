import { Box, Typography } from "@mui/material";
import CollectionConfigStore from "../../stores/CollectionConfigStore";
import { observer } from "mobx-react";
import { toJS } from "mobx";

interface CustomFieldsListProps {
  collectionConfigStore: CollectionConfigStore;
}

interface CustomFieldInfoRowProps {
  name: string;
  type: string;
}

const CustomFieldInfoRow = ({ name, type }: CustomFieldInfoRowProps) => {
  return (
    <Box
      key={name}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}>
      <Box sx={{ flex: "1 1", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
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
      {collectionConfigStore.additionalFieldsInfo.map((info) => (
        <CustomFieldInfoRow
          key={info.name}
          name={info.name}
          type={info.type}
        />
      ))}
    </>
  );
};

export default observer(CustomFieldsList);

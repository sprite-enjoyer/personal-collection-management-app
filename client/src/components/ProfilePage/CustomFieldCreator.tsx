import { observer } from "mobx-react";
import CollectionConfigStore from "../../stores/CollectionConfigStore";
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material";
import { AdditionalFieldTypeString } from "../../misc/types";

interface CustomFieldCreatorProps {
  collectionConfigStore: CollectionConfigStore;
}

const CustomFieldCreator = ({ collectionConfigStore }: CustomFieldCreatorProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}>
        <TextField
          onChange={(e) => collectionConfigStore.setCustomFieldToBeAddedName(e.target.value)}
          placeholder="Name"
          value={collectionConfigStore.additionalFieldToBeAddedName}
        />
        <FormControl>
          <InputLabel id="field-type">Type</InputLabel>
          <Select
            onChange={(e) =>
              collectionConfigStore.setCustomFieldToBeAddedType(e.target.value as AdditionalFieldTypeString)
            }
            labelId="field-type"
            label="Type"
            value={collectionConfigStore.additionalFieldToBeAddedType}
            defaultValue="string">
            {["string", "multiline", "integer", "boolean", "date"].map((type, i) => (
              <MenuItem
                value={type}
                key={i}>
                <Typography>{type}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={() => collectionConfigStore.addCustomField()}>
          add custom field
        </Button>
      </Box>
    </>
  );
};

export default observer(CustomFieldCreator);

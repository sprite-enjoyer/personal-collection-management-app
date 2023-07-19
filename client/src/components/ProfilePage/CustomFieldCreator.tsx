import { observer } from "mobx-react";
import CollectionConfigStore from "../../stores/CollectionConfigStore";
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material";
import { AdditionalFieldTypeString } from "../../misc/types";
import { useThemeContext } from "../../misc/theme";

interface CustomFieldCreatorProps {
  collectionConfigStore: CollectionConfigStore;
}

const CustomFieldCreator = ({ collectionConfigStore }: CustomFieldCreatorProps) => {
  const { theme } = useThemeContext();
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
          label="Name"
          value={collectionConfigStore.additionalFieldToBeAddedName}
          InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
        />
        <FormControl>
          <InputLabel
            sx={{ color: theme.palette.text.secondary }}
            id="field-type">
            Type
          </InputLabel>
          <Select
            onChange={(e) =>
              collectionConfigStore.setCustomFieldToBeAddedType(e.target.value as AdditionalFieldTypeString)
            }
            labelId="field-type"
            label="Type"
            value={collectionConfigStore.additionalFieldToBeAddedType}
            inputProps={{
              MenuProps: {
                MenuListProps: {
                  sx: {
                    backgroundColor: "gray",
                    color: theme.palette.text.secondary,
                  },
                },
              },
            }}
            defaultValue="string">
            {["string", "multiline", "integer", "boolean", "date"].map((type, i) => (
              <MenuItem
                sx={{
                  backgroundColor: theme.palette.background.default,
                  ":hover": { backgroundColor: "gray" },
                  color: theme.palette.text.primary,
                }}
                value={type}
                key={i}>
                <Typography color={theme.palette.text.secondary}>{type}</Typography>
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

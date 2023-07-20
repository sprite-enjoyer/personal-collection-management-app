import { Switch, TextField, Typography } from "@mui/material";
import ItemConfigStore from "../../stores/ItemConfigStore";
import { DateTimePicker } from "@mui/x-date-pickers";
import { observer } from "mobx-react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdditionalFieldType, GenericAdditionalField } from "../../misc/types";
import MDEditor from "@uiw/react-md-editor";
import { useThemeContext } from "../../misc/theme";

interface SpecificInputFieldTypeProps<T> {
  field: GenericAdditionalField<T>;
  itemConfigStore: ItemConfigStore;
}

const BooleanInputField = observer(({ itemConfigStore, field }: SpecificInputFieldTypeProps<boolean>) => {
  const { theme } = useThemeContext();
  return (
    <>
      <label htmlFor="switch">
        <Typography
          variant="h6"
          sx={{ color: theme.palette.text.secondary }}>
          {field.name}:
        </Typography>
      </label>
      <Switch
        id="switch"
        onChange={(e) => itemConfigStore.setFieldValue(field.name, e.target.checked)}
      />
    </>
  );
});

const DateInputField = observer(({ itemConfigStore, field }: SpecificInputFieldTypeProps<Date>) => {
  const { theme } = useThemeContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={<Typography color={theme.palette.text.secondary}>{field.name}</Typography>}
        onAccept={(e: { $d: Date } | null) => itemConfigStore.setFieldValue(field.name, e?.$d ?? new Date())}
        value={{ $d: field.value }}
        slotProps={{
          openPickerButton: {
            sx: { backgroundColor: theme.palette.background.default, color: theme.palette.text.primary },
          },
          digitalClockSectionItem: {
            sx: { backgroundColor: theme.palette.background.default, color: theme.palette.text.primary },
          },
          desktopPaper: {
            sx: { backgroundColor: theme.palette.background.default, color: theme.palette.text.primary },
          },
          day: {
            sx: { color: theme.palette.text.primary },
          },
          mobilePaper: {
            sx: { backgroundColor: theme.palette.background.default, color: theme.palette.text.primary },
          },
        }}
      />
    </LocalizationProvider>
  );
});

const IntegerInputField = observer(({ field, itemConfigStore }: SpecificInputFieldTypeProps<number>) => {
  const { theme } = useThemeContext();

  return (
    <TextField
      type="integer"
      label={field.name}
      onChange={(e) => {
        const unparsable = isNaN(parseInt(e.target.value));
        itemConfigStore.setFieldValue(field.name, unparsable ? 0 : parseInt(e.target.value));
      }}
      value={field.value}
      InputProps={{ sx: { color: theme.palette.text.secondary } }}
      InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
    />
  );
});

const StringInputField = observer(({ field, itemConfigStore }: SpecificInputFieldTypeProps<string>) => {
  const { theme } = useThemeContext();

  return (
    <>
      {field.type === "multiline" ? (
        <>
          <label htmlFor="md-editor">
            <Typography
              variant="h6"
              sx={{ color: theme.palette.text.secondary }}>
              {field.name}:
            </Typography>
          </label>
          <MDEditor
            id="md-editor"
            overflow={true}
            value={field.value}
            onChange={(e) => itemConfigStore.setFieldValue(field.name, e ?? "")}
            data-color-mode={theme.palette.mode}
            style={{ minHeight: "200px" }}
          />
        </>
      ) : (
        <TextField
          label={field.name}
          onChange={(e) => itemConfigStore.setFieldValue(field.name, e.target.value)}
          value={field.value}
          InputProps={{ sx: { color: theme.palette.text.secondary } }}
          InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
        />
      )}
    </>
  );
});

const AdditionalFieldInput = ({ field, itemConfigStore }: SpecificInputFieldTypeProps<AdditionalFieldType>) => {
  switch (field.type) {
    case "boolean":
      return (
        <BooleanInputField
          field={field as unknown as GenericAdditionalField<boolean>}
          itemConfigStore={itemConfigStore}
        />
      );
    case "date":
      return (
        <DateInputField
          field={field as unknown as GenericAdditionalField<Date>}
          itemConfigStore={itemConfigStore}
        />
      );
    case "integer":
      return (
        <IntegerInputField
          field={field as unknown as GenericAdditionalField<number>}
          itemConfigStore={itemConfigStore}
        />
      );
    case "multiline":
    case "string":
      return (
        <StringInputField
          field={field as unknown as GenericAdditionalField<string>}
          itemConfigStore={itemConfigStore}
        />
      );
  }
};

export default observer(AdditionalFieldInput);

import { FormControlLabel, Switch, TextField } from "@mui/material";
import { FullCustomField } from "../../misc/types";
import ItemConfigStore from "../../stores/ItemConfigStore";
import { DateTimePicker } from "@mui/x-date-pickers";
import { observer } from "mobx-react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { toJS } from "mobx";

interface CustomFieldProps {
  field: FullCustomField;
  itemConfigStore: ItemConfigStore;
}

const BooleanCustomField = ({ itemConfigStore, field }: CustomFieldProps) => {
  return (
    <FormControlLabel
      control={<Switch onChange={(e) => itemConfigStore.setFieldValue(field.id, e.target.value)} />}
      label={field.name}
    />
  );
};

const DateCustomField = ({ itemConfigStore, field }: CustomFieldProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={field.name}
        //@ts-ignore
        onAccept={(e: { $d: Date }) => itemConfigStore.setFieldValue(field.id, e.$d)}
      />
    </LocalizationProvider>
  );
};

const StringOrNumberCustomField = ({ itemConfigStore, field }: CustomFieldProps) => {
  return (
    <TextField
      label={field.name}
      multiline={field.type === "multiline"}
      onChange={(e) => itemConfigStore.setFieldValue(field.id, e.target.value)}
    />
  );
};

const CustomField = ({ field, itemConfigStore }: CustomFieldProps) => {
  switch (field.type) {
    case "boolean":
      return (
        <BooleanCustomField
          field={field}
          itemConfigStore={itemConfigStore}
        />
      );
    case "date":
      return (
        <DateCustomField
          field={field}
          itemConfigStore={itemConfigStore}
        />
      );
    case "integer":
    case "multiline":
    case "string":
      return (
        <StringOrNumberCustomField
          field={field}
          itemConfigStore={itemConfigStore}
        />
      );
  }
};

export default observer(CustomField);

import { FormControlLabel, Switch, TextField } from "@mui/material";
import ItemConfigStore from "../../stores/ItemConfigStore";
import { DateTimePicker } from "@mui/x-date-pickers";
import { observer } from "mobx-react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdditionalFieldType, GenericAdditionalField } from "../../misc/types";

interface SpecificInputFieldTypeProps<T> {
  field: GenericAdditionalField<T>;
  itemConfigStore: ItemConfigStore;
}

const BooleanInputField = ({ itemConfigStore, field }: SpecificInputFieldTypeProps<boolean>) => {
  return (
    <FormControlLabel
      control={<Switch onChange={(e) => itemConfigStore.setFieldValue(field.name, e.target.checked)} />}
      label={field.name}
    />
  );
};

const DateInputField = ({ itemConfigStore, field }: SpecificInputFieldTypeProps<Date>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={field.name}
        //@ts-ignore
        onAccept={(e: { $d: Date }) => itemConfigStore.setFieldValue(field.name, e.$d)}
      />
    </LocalizationProvider>
  );
};

const IntegerInputField = ({ field, itemConfigStore }: SpecificInputFieldTypeProps<number>) => {
  return (
    <TextField
      type="integer"
      label={field.name}
      onChange={(e) => itemConfigStore.setFieldValue(field.name, parseInt(e.target.value))}
    />
  );
};

const StringOrIntegerInputField = ({ field, itemConfigStore }: SpecificInputFieldTypeProps<string>) => {
  return (
    <TextField
      label={field.name}
      multiline={field.value.length > 40}
      onChange={(e) => itemConfigStore.setFieldValue(field.name, e.target.value)}
    />
  );
};

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
        <StringOrIntegerInputField
          field={field as unknown as GenericAdditionalField<string>}
          itemConfigStore={itemConfigStore}
        />
      );
  }
};

export default observer(AdditionalFieldInput);

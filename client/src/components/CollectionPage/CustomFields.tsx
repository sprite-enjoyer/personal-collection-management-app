import { Switch, TextField, Typography } from "@mui/material";
import ItemConfigStore from "../../stores/ItemConfigStore";
import { DateTimePicker } from "@mui/x-date-pickers";
import { observer } from "mobx-react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdditionalFieldType, GenericAdditionalField } from "../../misc/types";
import MDEditor from "@uiw/react-md-editor";

interface SpecificInputFieldTypeProps<T> {
  field: GenericAdditionalField<T>;
  itemConfigStore: ItemConfigStore;
}

const BooleanInputField = observer(({ itemConfigStore, field }: SpecificInputFieldTypeProps<boolean>) => {
  return (
    <>
      <label htmlFor="switch">
        <Typography variant="h6">{field.name}:</Typography>
      </label>
      <Switch
        id="switch"
        onChange={(e) => itemConfigStore.setFieldValue(field.name, e.target.checked)}
      />
    </>
  );
});

const DateInputField = observer(({ itemConfigStore, field }: SpecificInputFieldTypeProps<Date>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={field.name}
        //@ts-ignore
        onAccept={(e: { $d: Date }) => itemConfigStore.setFieldValue(field.name, e.$d)}
        value={{ $d: field.value }}
      />
    </LocalizationProvider>
  );
});

const IntegerInputField = observer(({ field, itemConfigStore }: SpecificInputFieldTypeProps<number>) => {
  return (
    <TextField
      type="integer"
      label={field.name}
      onChange={(e) => {
        const unparsable = isNaN(parseInt(e.target.value));
        itemConfigStore.setFieldValue(field.name, unparsable ? 0 : parseInt(e.target.value));
      }}
      value={field.value}
    />
  );
});

const StringInputField = observer(({ field, itemConfigStore }: SpecificInputFieldTypeProps<string>) => {
  return (
    <>
      {field.type === "multiline" ? (
        <>
          <label htmlFor="md-editor">
            <Typography variant="h6">{field.name}:</Typography>
          </label>
          <MDEditor
            id="md-editor"
            overflow={true}
            value={field.value}
            onChange={(e) => itemConfigStore.setFieldValue(field.name, e ?? "")}
            data-color-mode="light"
            style={{ minHeight: "200px" }}
          />
        </>
      ) : (
        <TextField
          label={field.name}
          multiline={false}
          onChange={(e) => itemConfigStore.setFieldValue(field.name, e.target.value)}
          value={field.value}
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

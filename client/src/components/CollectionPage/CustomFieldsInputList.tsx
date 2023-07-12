import { observer } from "mobx-react";
import ItemConfigStore from "../../stores/ItemConfigStore";
import AdditionalFieldInput from "./CustomFields";
import { TextField } from "@mui/material";

interface CustomFieldsInputListProps {
  itemConfigStore: ItemConfigStore;
}

const CustomFieldsInputList = ({ itemConfigStore }: CustomFieldsInputListProps) => {
  return (
    <>
      {itemConfigStore.additionalFields.map((field) => (
        <AdditionalFieldInput
          key={field._id}
          field={
            field.value !== null
              ? field
              : { ...field, value: ItemConfigStore.getFieldDefaultValue(field.type, new Date()) }
          }
          itemConfigStore={itemConfigStore}
        />
      ))}
    </>
  );
};

export default observer(CustomFieldsInputList);

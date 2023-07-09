import { observer } from "mobx-react";
import ItemConfigStore from "../../stores/ItemConfigStore";
import AdditionalFieldInput from "./CustomFields";

interface CustomFieldsInputListProps {
  itemConfigStore: ItemConfigStore;
}

const CustomFieldsInputList = ({ itemConfigStore }: CustomFieldsInputListProps) => {
  return (
    <>
      {itemConfigStore.additionalFields.map((field) => (
        <AdditionalFieldInput
          key={field.name}
          field={field}
          itemConfigStore={itemConfigStore}
        />
      ))}
    </>
  );
};

export default observer(CustomFieldsInputList);

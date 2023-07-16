import { Chip } from "@mui/material";
import SearchModal, { SearchModalProps } from "../SearchModal";
import { useState } from "react";

interface TagCloudProps {
  tags: string[];
}

const TagCloud = ({ tags }: TagCloudProps) => {
  const [searchModalProps, setSearchModalProps] = useState<SearchModalProps>({
    initialSearchValues: [],
    onCloseCallback: () =>
      setSearchModalProps((prev) => {
        return { ...prev, open: false };
      }),
    open: false,
  });

  const handleChipClick = (tag: string) => {
    setSearchModalProps({
      initialSearchValues: [`tag:${tag}`],
      onCloseCallback: () =>
        setSearchModalProps((prev) => {
          return { ...prev, open: false };
        }),
      open: true,
    });
  };

  return (
    <>
      <SearchModal {...searchModalProps} />
      {tags.map((tag) => (
        <Chip
          component={"button"}
          onClick={() => handleChipClick(tag)}
          clickable
          label={tag}
          key={tag}
          size="medium"
          sx={{
            color: `hsl(${130 + Math.floor(Math.random() * 125)}, 100%, 40%)`,
            fontSize: "1.2em",
            margin: "5px",
          }}
        />
      ))}
    </>
  );
};

export default TagCloud;

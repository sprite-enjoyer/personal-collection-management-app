import { observer } from "mobx-react";
import CollectionConfigStore from "../../stores/CollectionConfigStore";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { CloudinaryResponse } from "../../misc/types";
import { useLanguageContext } from "../../misc/language";
import { useThemeContext } from "../../misc/theme";

interface ImageUploaderProps {
  collectionConfigStore: CollectionConfigStore;
}

const ImageUploader = ({ collectionConfigStore }: ImageUploaderProps) => {
  const [imageSelected, setImageSelected] = useState<File | string>("");
  const {
    staticTextObject: {
      CollectionConfigModal: { uploadImage, uploadImageSubmit },
    },
  } = useLanguageContext();
  const { theme } = useThemeContext();

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];
    setImageSelected(file ?? "");
  };

  const handleButtonClick = async () => {
    const formData = new FormData();
    const cloudinarySecret = import.meta.env.VITE_CLOUDINARY_SECRET;
    const cloudinaryEndpoint = import.meta.env.VITE_CLOUDINARY_ENDPOINT;
    formData.append("upload_preset", cloudinarySecret);
    formData.append("file", imageSelected);
    const response: CloudinaryResponse = await axios.post(cloudinaryEndpoint, formData);
    collectionConfigStore.setImageUrl(response.data.url);
  };

  return (
    <Box
      display={"flex"}
      gap={"10px"}
      alignItems={"center"}>
      <label
        htmlFor="fileInput"
        style={{
          backgroundColor: "#1565C0",
          color: "white",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}>
        {uploadImage}
        <input
          type="file"
          id="fileInput"
          onChange={handleInputChange}
          style={{ display: "none" }}
        />
      </label>
      <Typography
        marginLeft={"10px"}
        color={theme.palette.text.secondary}>
        {typeof imageSelected !== "string" ? imageSelected.name : imageSelected}
      </Typography>
      <Button onClick={handleButtonClick}>{uploadImageSubmit}</Button>
    </Box>
  );
};

export default observer(ImageUploader);

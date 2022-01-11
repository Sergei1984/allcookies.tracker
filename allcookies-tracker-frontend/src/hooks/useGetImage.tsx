import React from "react";
import ImagePicker from "react-native-image-crop-picker";

interface Image {
  uri: string;
  width: number;
  height: number;
  mime: string;
}

export const useGetImage = () => {
  const [image, setImage] = React.useState<Image | null>(null);
  const [images, setImages] = React.useState<Image[]>([]);
  const pickSingleWithCamera = React.useCallback(
    async (cropping: boolean, mediaType: any = "photo") => {
      try {
        const image = await ImagePicker.openCamera({
          cropping: cropping,
          width: 500,
          height: 500,
          includeExif: true,
          mediaType,
        });
        setImage({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const pickSingle = React.useCallback(
    async (cropping: boolean, circular = false) => {
      try {
        const image = await ImagePicker.openPicker({
          width: 100,
          height: 100,
          cropping: cropping,
          cropperCircleOverlay: circular,
          sortOrder: "none",
          compressImageMaxWidth: 1000,
          compressImageMaxHeight: 1000,
          compressImageQuality: 1,
          compressVideoPreset: "MediumQuality",
          includeExif: true,
          cropperStatusBarColor: "white",
          cropperToolbarColor: "white",
          cropperActiveWidgetColor: "white",
          cropperToolbarWidgetColor: "#3498DB",
        });
        setImages([
          ...images,
          {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
        ]);
        // setImage({
        //   uri: image.path,
        //   width: image.width,
        //   height: image.height,
        //   mime: image.mime,
        // });
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return {
    data: { image, images },
    handle: {
      pickSingle,
      pickSingleWithCamera,
    },
  };
};

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
  const [images, setImages] = React.useState<Image[] | any>([]);
  const pickSingleWithCamera = React.useCallback(
    async (cropping: boolean, mediaType: any = "photo") => {
      try {
        const image = await ImagePicker.openCamera({
          cropping: cropping,
          // width: 100,
          // height: 100,
          includeExif: true,
          mediaType,
          includeBase64: true,
        });
        setImage({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
        setImages([
          ...images,
          {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
            index: images.length + 1,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    },
    [images]
  );

  const pickSingle = React.useCallback(
    async (cropping: boolean, circular = false) => {
      try {
        const selectedImages = await ImagePicker.openPicker({
          // width: 100,
          // height: 100,
          cropping: cropping,
          cropperCircleOverlay: circular,
          sortOrder: "none",
          includeExif: true,
          cropperStatusBarColor: "white",
          cropperToolbarColor: "white",
          cropperActiveWidgetColor: "white",
          cropperToolbarWidgetColor: "#3498DB",
          multiple: true,
          includeBase64: true,
        });
        setImages([
          ...images,
          ...selectedImages.map((i: any, index) => {
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
              index: index,
            };
          }),
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
      setImages,
    },
  };
};

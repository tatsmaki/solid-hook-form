import { ImageProps } from "./image.types";

export const Image = (props: ImageProps) => {
  return (
    <img
      {...props}
      style={{ width: "600px", "max-width": "100%", margin: "32px auto", display: "block" }}
    />
  );
};

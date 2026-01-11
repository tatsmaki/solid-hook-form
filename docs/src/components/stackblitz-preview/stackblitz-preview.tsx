import type { StackBlitzPreviewProps } from "./stackblitz-preview.types";

export const StackBlitzPreview = (props: StackBlitzPreviewProps) => {
  const { src, title, height = "450px", hideExplorer = true, ...iframeProps } = props;

  return (
    <div
      style={{
        margin: "2rem 0",
        border: "none",
        overflow: "hidden"
      }}
    >
      <iframe
        src={`${src}&embed=1&view=preview&hideExplorer=${Number(hideExplorer)}&hideNavigation=1`}
        title={`StackBlitz - ${title}`}
        style={{
          width: "100%",
          height,
          border: "none"
        }}
        loading="lazy"
        {...iframeProps}
      />
    </div>
  );
};

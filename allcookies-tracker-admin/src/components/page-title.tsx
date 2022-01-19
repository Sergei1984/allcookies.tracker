import React from "react";

interface PageTitleProps {
  title: string;
}
const PageTitle = ({ title }: PageTitleProps): JSX.Element => {
  return (
    <h1
      style={{
        fontWeight: "bold",
        fontSize: "24px",
        lineHeight: "34px",
        letterSpacing: "1px",
        color: "#171717",
        marginBottom: "24px",
      }}
    >
      {title}
    </h1>
  );
};

export default PageTitle;

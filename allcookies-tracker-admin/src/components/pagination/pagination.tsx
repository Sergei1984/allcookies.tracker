import * as React from "react";
import usePagination from "@mui/material/usePagination";
import { PaginationProps } from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",

  "& > li:last-child > button": {
    marginRight: 0,
  },
});

interface CustomPaginationProps extends PaginationProps {}

const CustomPagination = (props: CustomPaginationProps): JSX.Element => {
  const { items } = usePagination({
    count: props.count || 10,
    defaultPage: 1,
    ...props,
  });

  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                {...item}
                sx={{
                  fontWeight: selected ? "bold" : undefined,
                  background: "transparent",
                  borderRadius: "4px",
                  width: 46,
                  height: 44,
                  mr: 2,
                  "&:hover": {
                    borderRadius: "4",
                    background: "#42A6A6",
                  },
                  "&:disabled": {
                    background: "rgba(66, 166, 166, 0.1)",
                  },
                }}
              >
                ...
              </IconButton>
            );
          } else if (type === "page") {
            children = (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                {...item}
                sx={{
                  fontWeight: selected ? "bold" : undefined,
                  background: "transparent",
                  borderRadius: "4px",
                  fontSize: 14,
                  color: "#28293D",
                  width: 46,
                  height: 44,
                  mr: 2,
                  "&:hover": {
                    borderRadius: "4",
                    background: "#42A6A6",
                  },
                  "&:disabled": {
                    background: "rgba(66, 166, 166, 0.1)",
                  },
                }}
              >
                {page}
              </IconButton>
            );
          } else {
            children = (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                {...item}
                sx={{
                  background: "#42A6A6",
                  borderRadius: "4px",
                  width: 46,
                  height: 44,
                  mr: 2,
                  "&:hover": {
                    background: "#42A6A6",
                    borderRadius: "4px",
                  },
                  "&:disabled": {
                    background: "rgba(66, 166, 166, 0.1)",
                  },
                }}
              >
                {type === "previous" ? (
                  <ChevronLeftIcon sx={{ color: "#fff" }} />
                ) : (
                  <ChevronRightIcon sx={{ color: "#fff" }} />
                )}
              </IconButton>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
};

export default CustomPagination;

import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface NestedTableOptionsListProps {
  title: string;
  multiple?: boolean;
  item: any;
}

const NestedTableOptionsList = ({
  title,
  item,
  multiple,
}: NestedTableOptionsListProps) => {
  // single
  const visible_single_text = item.is_disabled ? `Показать` : `Скрыть`;
  const remove_single_text = "Удалить";

  // multiply
  const hidden = "Скрыть все";
  const visibility = "Показать все";
  const multiple_delete_text = "Удалить все";

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {title}
        </ListSubheader>
      }
    >
      {multiple ? (
        <>
          <ListItemButton>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary={visibility} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <VisibilityOffIcon />
            </ListItemIcon>
            <ListItemText primary={hidden} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary={multiple_delete_text} />
          </ListItemButton>
        </>
      ) : (
        <>
          <ListItemButton>
            <ListItemIcon>
              {item.is_disabled ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </ListItemIcon>
            <ListItemText primary={visible_single_text} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary={remove_single_text} />
          </ListItemButton>
        </>
      )}
    </List>
  );
};

export default NestedTableOptionsList;

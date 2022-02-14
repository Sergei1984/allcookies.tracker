import React, { useState, forwardRef, useCallback } from "react";
import classnames from "classnames";
import { makeStyles } from "@mui/styles";
import { useSnackbar, SnackbarContent } from "notistack";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { VariantEnums } from "../core/enums";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "344px !important",
    maxWidth: "344px",
  },
  card: {
    width: "100%",
    maxWidth: "344px",
    color: "#ffffff",
  },
  description: {
    width: "100%",
  },

  typography: {
    fontWeight: "bold",
  },
  actionRoot: {
    padding: "8px 8px 8px 16px",
    justifyContent: "space-between",
  },
  icons: {
    marginLeft: "auto",
    display: "flex",
  },
  expand: {
    padding: "8px 8px",
    transform: "rotate(0deg)",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  collapse: {
    padding: 16,
  },
  checkIcon: {
    fontSize: 20,
    color: "#b3b3b3",
    paddingRight: 4,
  },
  button: {
    padding: 0,
    textTransform: "none",
  },
}));

const useCardStyles = makeStyles((theme) => ({
  success: {
    width: "100%",
    backgroundColor: "#43a047",
  },
  error: {
    width: "100%",
    backgroundColor: "#d32f2f",
  },
  info: {
    width: "100%",
    backgroundColor: "#2196f3",
  },
  warning: {
    width: "100%",
    backgroundColor: "#fddc6c",
  },
  default: {
    width: "100%",
    backgroundColor: "#ffffff",
  },
}));

const useTitleStyles = makeStyles((theme) => ({
  success: {
    color: "#ffffff",
  },
  error: {
    color: "#ffffff",
  },
  info: {
    color: "#ffffff",
  },
  warning: {
    color: "#ffffff",
  },
  default: {
    color: "#000000",
  },
}));

interface SnackMessageProps {
  id: string | number;
  message: string | React.ReactNode;
  title: string;
  variant: VariantEnums;
}

const SnackMessage = forwardRef<HTMLDivElement, SnackMessageProps>(
  (props, ref) => {
    const classes = useStyles();
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);
    const cards = useCardStyles();
    const titleClasses = useTitleStyles();

    const handleExpandClick = useCallback(() => {
      setExpanded((oldExpanded) => !oldExpanded);
    }, []);

    const handleDismiss = useCallback(() => {
      closeSnackbar(props.id);
    }, [props.id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref} className={classes.root}>
        <Card
          className={classnames(
            classes.card,
            cards[props.variant ? props.variant : VariantEnums.default]
          )}
        >
          <CardActions classes={{ root: classes.actionRoot }}>
            <Typography
              variant="subtitle2"
              className={classnames(
                classes.typography,
                titleClasses[
                  props.variant ? props.variant : VariantEnums.default
                ]
              )}
            >
              {props.title}
            </Typography>
            <div className={classes.icons}>
              <IconButton
                aria-label="Show more"
                className={classnames(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
              >
                <ExpandMoreIcon
                  className={
                    titleClasses[
                      props.variant ? props.variant : VariantEnums.default
                    ]
                  }
                />
              </IconButton>
              <IconButton className={classes.expand} onClick={handleDismiss}>
                <CloseIcon
                  className={
                    titleClasses[
                      props.variant ? props.variant : VariantEnums.default
                    ]
                  }
                />
              </IconButton>
            </div>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Paper className={classes.collapse}>
              <Typography gutterBottom>{props.message}</Typography>
            </Paper>
          </Collapse>
        </Card>
      </SnackbarContent>
    );
  }
);

export default SnackMessage;

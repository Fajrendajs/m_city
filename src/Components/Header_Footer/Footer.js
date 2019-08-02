import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  copy: {
    margin: "auto",
    minHeight: "10px"
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.copy}>
        Manchester City 2018. All rights reserved.
      </Typography>
    </div>
  );
}

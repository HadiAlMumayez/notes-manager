import React from "react";
import NotesList from "../NotesList";
import CreateNote from "../CreateNote";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { StateProvider, initialState, reducer } from "../../statemanagement";
import ModalBase from "../../Utils/Modal";
import { useStyles } from "./styles";
import CreateCategory from "../CreateCategory";
import CategoriesList from "../CategoriesList";

function MainComponent() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Grid container spacing={3}>
          <StateProvider initialState={initialState} reducer={reducer}>
            <React.Fragment>
              <ModalBase />
              <Grid item xs={3}>
                <CreateCategory />
              </Grid>
              <Grid item xs={9}>
                <CategoriesList />
              </Grid>
              <Grid item xs={8}>
                <NotesList />
              </Grid>
              <Grid item xs={4}>
                <CreateNote />
              </Grid>
            </React.Fragment>
          </StateProvider>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}

export default MainComponent;

import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import React from "react";
import Paper from "@material-ui/core/Paper";
import LocalStorage from "../../Utils/localStorage";
import { useStateValue } from "../../statemanagement";
import Grid from "@material-ui/core/Grid";
import { useNoteStyles as useStyles } from "./styles";
var FontAwesome = require('react-fontawesome');

function Note(props) {
  const { item } = props;
  const { id, title, category, categoryName, message } = item;
  const classes = useStyles();
  const [, dispatch] = useStateValue();

  console.log('category is: ', category);

  function deleteNote() {
    let allNotes = JSON.parse(
      LocalStorage.getNotes()
    );

    let removeNote = allNotes.filter(
      note => note.id !== item.id
    );

    LocalStorage.set("notes", JSON.stringify(removeNote));

    dispatch({ type: "newNote", notes: removeNote });
  }

  function updateNote() {
    dispatch({ type: "openModal", modal: true, edit: id });
  }
  
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <div className={title} style={{ width: '100%' }}>
          <div style={{ display: 'inline-block' }}>
            <span className={classes.noteTitle}>
              {title}
            </span>
            <span className={classes.noteNumber}>
              {categoryName}
            </span>
          </div>
          <div style={{ display: 'inline-block', float: 'right', cursor: 'pointer' }}>
            <FontAwesome
              onClick={updateNote}
              className='super-crazy-colors'
              name='pencil'
              style={{ color: '#017fbd', marginRight: 10 }}
            />
            <FontAwesome
              onClick={deleteNote}
              className='super-crazy-colors'
              name='trash'
              style={{ color: 'red' }}
            />
          </div>
          <p>
            {message}
          </p>
        </div>
      </Grid>

      <Grid container>
        {/* <ButtonGroup
          color="primary"
          aria-label="outlined primary button group"
          className={classes.button}
        >
          <Button variant="outlined" color="secondary" onClick={deleteNote}>
            Delete
          </Button>
          <Button variant="outlined" color="primary" onClick={updateNote}>
            Update
          </Button>
          <Button variant="outlined" color="primary" onClick={showNote}>
            Show
          </Button>
        </ButtonGroup> */}
      </Grid>
    </Paper>
  );
}

export default Note;

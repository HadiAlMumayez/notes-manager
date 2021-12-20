import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Note from "./Note";
import { useStateValue } from "../../statemanagement";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useListStyles as useStyles } from "./styles";
import {List} from "@material-ui/core";

function NotesList() {
  const classes = useStyles();
  const [{ notes }] = useStateValue();
  const [mainData, setMainData] = useState([]);
  const [state, setState] = useState("");
  const [, setStateCategory] = useState("");

  function searchFor(keyword, array) {  
    return array.filter(note => {
      console.log('search for: ', keyword);
    console.log('in array: ', note['title']);
    
      return note['title']!==undefined && note['title'].toLowerCase().includes(keyword)
    });
  }

  function search(event) {
    const value = event.target.value;
    setState(value);
    setStateCategory("");
    const searched = searchFor(value, notes);
    console.log('result: ', searched);
    if (searched.length > 0) {
      setMainData(searched);
    }else{
      setMainData([]);
    }
    if (value.length === 0) {
      setMainData(notes);
    }
  }

  React.useEffect(() => {
    setMainData(notes);
  }, [notes]);

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        align="left"
        style={{'color' : '#017fbd'}}
        gutterBottom
        noWrap
      >
        Your Notes
      </Typography>

      <TextField
        value={state}
        id="outlined-textarea"
        label="search"
        placeholder="search title of note"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        fullWidth
        onChange={e => search(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <div style={{maxHeight: '350px', overflowY: 'auto'}}>
      <List>
      {mainData.length > 0 &&
          mainData.map((item, index) =>{
            return <Note
                row={index}
                item={item}
                key={item.id}/>  
            
          })}
      </List>
      </div>

      
    </React.Fragment>
  );
}

export default NotesList;

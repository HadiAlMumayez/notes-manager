import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import LocalStorage from "../../Utils/localStorage";
import { useStateCategories, useStateValue } from "../../statemanagement";
import { useStyles } from "./styles";

function CreateNote() {
  const classes = useStyles();
  const [{ categories }] = useStateCategories();
  const [mainData, setMainData] = React.useState([]);

  const [state, setState] = React.useState({
    id: 0,
    category: "",
    categoryName: "",
    message: "",
    title: ""
  });
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);


  React.useEffect(() => {
    console.log(categories);
    setMainData(categories);
  }, [categories]);

  /**
   * handle change inputs
   **/
  function handleChange(name, event, clear) {
    if (clear === 'clear') {
      setState({
        ...state,
        "category": "",
        "categoryName": "",
        "title": "",
         "message": "",
      });
    }
    else {
      if (name === 'category') {
        const values = event.target.value.split('-');
        setState({
          ...state,
          "category": values[0],
          "categoryName": values[1],
          id: new Date().getTime()
        });
      }
      else {
        setState({
          ...state,
          [name]: event.target.value,
          id: new Date().getTime()
        });
      }
    }
  }

  /**
   * Add notes inside of localStorage and context api
   **/
  function addToNotes() {

    if (state.category === "") {
      alert("Please select a Category");
    }
    else {
      const allNotes = LocalStorage.getNotes();
      let allNodesObject = allNotes !== null ? JSON.parse(allNotes) : [];
      const rowExists = LocalStorage.rowExists(state);
      if (rowExists.length === 0) {
        if (allNodesObject.length === 0) {
          allNodesObject = [state];
        } else {
          allNodesObject.push(state);
        }
        LocalStorage.setNotes(JSON.stringify(allNodesObject));
        dispatch({
          type: "newNote",
          notes: allNodesObject
        });
        handleChange("title", null, 'clear');
      }
    }
  }

  /**
   * On component Did mount , send data from localStorage into context api
   **/
  React.useEffect(() => {
    let Notes = LocalStorage.getNotes();

    Notes = Notes !== null ? JSON.parse(Notes) : [];
    if (Notes.length > 0) {
      dispatch({ type: "newNote", notes: Notes });
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        align="left"
        style={{ 'color': '#017fbd' }}
        gutterBottom
        noWrap
      >
        Add a new Note
      </Typography>

      <TextField
        id="outlined-textarea"
        label="Title"
        placeholder="Write your title"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        value={state.title}
        fullWidth
        onChange={e => handleChange("title", e)}
      />

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-category-native-simple">
          Category
        </InputLabel>
        <Select
          native
          value={state.category + "-" + state.categoryName}
          onChange={e => handleChange("category", e)}
          labelWidth={labelWidth}
          inputProps={{
            name: "category",
            id: "outlined-category-native-simple"
          }}
        >
          <React.Fragment>
            <option key="-1" value="-">Select a category</option>
            {mainData.length > 0 &&
              mainData.map((item, index) => (
                <option key={index} value={item.id + "-" + item.title}>{item.title}</option>
              ))}
          </React.Fragment>

        </Select>
      </FormControl>

      <TextField
        id="outlined-textarea"
        label="Write your Message"
        placeholder="Write your note"
        multiline
        value={state.message}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={e => handleChange("message", e)}
        rows={10}
        fullWidth
      />
      <Button
        variant="outlined"
        style={{ 'color': '#017fbd' }}
        className={classes.button}
        onClick={addToNotes}
      >
        Add Note
      </Button>
    </React.Fragment>
  );
}

export default CreateNote;

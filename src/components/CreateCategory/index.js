import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LocalStorage from "../../Utils/localStorage";
import { useStateCategories } from "../../statemanagement";
import { useStyles } from "./styles";

function CreateCategory() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    id: 0,
    title: ""
  });
  const [, dispatch] = useStateCategories();

  function handleChange(name, event, clear) {
    if (clear === 'clear') {
      setState({
        ...state,
        "title": "",
        id: new Date().getTime()
      });
    } else {
      setState({
        ...state,
        [name]: event.target.value,
        id: new Date().getTime()
      });
    }
  }

  /**
   * Add notes inside of localStorage and context api
   **/
  function addToCatagories() {
    const allCategories = LocalStorage.getCategories();
    let allCategoriesOjbect = allCategories !== null ? JSON.parse(allCategories) : [];

    if (allCategoriesOjbect.length === 0) {
      allCategoriesOjbect = [state];
    } else {
      allCategoriesOjbect.push(state);
    }
    LocalStorage.setCategories(JSON.stringify(allCategoriesOjbect));
    dispatch({
      type: "newCategory",
      categories: allCategoriesOjbect
    });

    handleChange("title", null, 'clear');
  }

  /**
   * On component Did mount , send data from localStorage into context api
   **/
  React.useEffect(() => {
    let Categories = LocalStorage.getCategories();

    Categories = Categories !== null ? JSON.parse(Categories) : [];
    if (Categories.length > 0) {
      dispatch({ type: "newCategory", categories: Categories });
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
        Add a new Category
      </Typography>

      <input
        id="outlined-textarea"
        label="Title"
        placeholder="Write your title"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        //fullWidth
        value={state.title}
        onChange={e => handleChange("title", e)}
      />

      <Button
        variant="outlined"
        style={{ 'color': '#017fbd' }}
        className={classes.button}
        onClick={addToCatagories}
      >
        Save
      </Button>
    </React.Fragment>
  );
}

export default CreateCategory;

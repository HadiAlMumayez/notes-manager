import React, { useState } from "react";
import { useStateCategories } from "../../statemanagement";
import { useStateValue } from "../../statemanagement";
import { useListStyles as useStyles } from "./styles";
import LocalStorage from "../../Utils/localStorage";

function CategoriesList() {
  const classes = useStyles();
  const [{ categories }] = useStateCategories();
  const [mainData, setMainData] = useState([]);
  const [, setState] = useState("");
  const [{ resetFilter }] = useStateValue();
  
  const [stateCategory, setStateCategory] = useState("-1");
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    setMainData(categories);
  }, [categories]);

  React.useEffect(() => {
    if (resetFilter) {
      setState("-1");
      setStateCategory("-1");
    }
  }, [resetFilter]);

  function searchFor(id, array) {
    dispatch({ type: "resetFilter", resetFilter: false });
    return array.filter(note => {
      return note['category'] !== undefined && note['category'] == id
    });
  }

  function categorySelected(categoryId) {
    setState(categoryId);
    setStateCategory(categoryId);
    var allNotes = LocalStorage.getParsedNotesList();
    const searched = searchFor(categoryId, allNotes);

    if (categoryId == "-1") {
      dispatch({
        type: "notesUpdated",
        notes: allNotes
      });
    } else {
      if (searched.length > 0) {
        dispatch({
          type: "notesUpdated",
          notes: searched
        });
      }
      else if (searched.length === 0) {
        dispatch({
          type: "notesUpdated",
          notes: [],
        });
      }
    }

  }

  return (
    <React.Fragment>
      <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
        <div>
          <span key="-1" className={stateCategory !== "-1" ? classes.secondary : classes.primary}>
            <span onClick={() => categorySelected("-1")}>
              all
            </span>
          </span>
          {mainData.length > 0 &&
            mainData.map((item, index) => (
              <span key={index} className={stateCategory !== item["id"] ? classes.secondary : classes.primary}>
                <span onClick={() => categorySelected(item["id"])}>
                  {item.title}
                </span>
              </span>
            ))}
        </div>
      </div>

    </React.Fragment>
  );
}

export default CategoriesList;

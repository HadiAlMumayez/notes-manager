import { makeStyles } from "@material-ui/core/styles";

export const useNoteStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1) * 2,
    color: theme.palette.text.secondary,
    margin: 8
  },
  title: {
    wordBreak: "break-all",
    paddingBottom: 10
  }
}));

export const useListStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    
    color: theme.palette.text.secondary,
    marginBottom: 10
  },
  margin: {
    marginTop: 8
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  formControl: {
    marginTop: theme.spacing(1) + "px !important",
    marginBottom: theme.spacing(1) + "px !important",
    width: "100% !important"
  },
  moveToSelect: {
    backgroundColor: "#ccc !important",
    color: "#333 !important"
  },
  secondary: {
    padding: "10px",
    margin: "6px",
    display: "inline-flex",
    border: "solid 2px #017fbd",
    borderRadius: "10px",
    fontSize: "14px",
    cursor: "pointer"
  },
  primary: {
    backgroundColor: "#017fbd",
    padding: "10px",
    margin: "6px",
    color: "white",
    display: "inline-flex",
    border: "solid 2px #017fbd",
    borderRadius: "10px",
    fontSize: "14px",
    cursor: "pointer"
  }
}));

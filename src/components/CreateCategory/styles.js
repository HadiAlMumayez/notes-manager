import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    marginTop: 5,
    
  },
  textField: {
    border: "solid 2px #017fbd",
    borderRadius: "10px",
    margin: "10px 0",
    padding: "14px 20px",
    display: "block",
    width: "-webkit-fill-available",
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%"
  }
}));
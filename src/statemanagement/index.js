import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const useStateCategories = () => useContext(StateContext);

export const initialState = {
  notes: [],
  categories: [],
  modal: false,
  edit: null,
  show: null,
  showModal: false,
  resetFilter: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "resetFilter":
      console.log('reset filter in reducer', action);
      return {
        ...state,
        resetFilter: action.resetFilter
      };
    
    case "newCategory":
      return {
        ...state,
        categories: action.categories
      };

    case "notesUpdated":
      return {
        ...state,
        notes: action.notes
      };

    case "newNote":
      return {
        ...state,
        notes: action.notes
      };

    case "openModal":
      return {
        ...state,
        modal: action.modal,
        edit: action.edit
      };
    case "showMessage":
      return {
        ...state,
        showModal: action.showModal,
        show: action.show
      };

    default:
      return state;
  }
};

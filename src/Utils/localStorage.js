const LocalStorage = {};

LocalStorage.get = key => {
  return localStorage.getItem(key);
};
LocalStorage.set = (key, value) => {
  return localStorage.setItem(key, value);
};
LocalStorage.remove = key => {
  return localStorage.removeItem(key);
};
/**
 * get all notes
 **/
LocalStorage.getNotes = () => {
  return LocalStorage.get("notes");
};

/**
 * get all categories
 **/
 LocalStorage.getCategories = () => {
  return LocalStorage.get("categories");
};

/**
 * set a group of Categories
 **/
 LocalStorage.setCategories = value => {
  LocalStorage.set("categories", value);
};


/**
 * set a group of Notes
 **/
LocalStorage.setNotes = value => {
  LocalStorage.set("notes", value);
};

/**
 * remove Notes
 **/
LocalStorage.rmNotes = () => {
  LocalStorage.remove("notes");
};

/**
 * get a note by index
 **/
LocalStorage.note = id => {
  if (LocalStorage.getNotes() !== null) {
    const List = JSON.parse(LocalStorage.getNotes());
    return List[id];
  }
  return [];
};

/**
 * check that note exists by id
 **/
LocalStorage.rowExists = object => {
  const List = JSON.parse(LocalStorage.getNotes());
  if (List !== null && List.length > 0) {
    return List.filter(item => {
      return object.id === item.id;
    });
  } else {
    return [];
  }
};

LocalStorage.getParsedNotesList = () => {
  let Notes = LocalStorage.get("notes");
  let All;
  Notes = Notes !== null ? JSON.parse(Notes) : [];
  All = [...Notes];

  return All;
};
/**
 * get node by id
 **/
LocalStorage.findId = id => {
  const List = LocalStorage.getParsedNotesList();
  if (List !== null && List.length > 0) {
    return List.filter(item => {
      return id === item.id;
    });
  } else {
    return [];
  }
};

/**
 * update a note by id
 **/
LocalStorage.updateId = (id, itemObject) => {
  const List = JSON.parse(LocalStorage.getNotes());

  if (List !== null && List.length > 0) {
    const updatedList = List.filter(item => {
      if (id === item.id) {

        const { title, message, category,categoryName } = itemObject;
        item.title = title;
        item.message = message;
        item.category = category;
        item.categoryName = categoryName;
      }
      return item;
    });
    LocalStorage.set(
      "notes",
      JSON.stringify(updatedList)
    );
    return true;
  } else {
    return false;
  }
};

export default LocalStorage;

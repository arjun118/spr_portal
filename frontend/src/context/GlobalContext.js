import { createContext } from "react";

const GlobalContext = createContext({
  showEditModal: false,
  setshowEditModal: () => {},
  selectedItem: null,
  setselectedItem: () => {},
  refreshPage: false,
  setrefreshPage: () => {},
});

export default GlobalContext;

import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

export default function GlobalState(props) {
  const [showEditModal, setshowEditModal] = useState(false);
  const [selectedItem, setselectedItem] = useState(null);
  const [refreshPage, setrefreshPage] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        showEditModal,
        setshowEditModal,
        selectedItem,
        setselectedItem,
        refreshPage,
        setrefreshPage,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

import React from "react";
import { WorkoutsContext } from "../context/WorkoutsContext";

const useWorkoutsContext = () => {
  const context = React.useContext(WorkoutsContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};

export default useWorkoutsContext;

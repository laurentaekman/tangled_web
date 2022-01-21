import React, { createContext, useContext } from "react";

const initialObjectIDList: number[] = [];
const initialDepartmentsList: any[] = [];

const ObjectsContext = React.createContext({
  objectIDs: initialObjectIDList,
  departments: initialDepartmentsList,
});

export default ObjectsContext;

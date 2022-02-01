import React, { createContext, useContext } from "react";

const initialObjectIdList: number[] = [];
const initialDepartmentsList: any[] = [];

const ObjectsContext = React.createContext({
  objectIds: initialObjectIdList,
  departments: initialDepartmentsList,
});

export default ObjectsContext;

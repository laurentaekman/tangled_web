import React from "react";

const initialObjectIdList: number[] = [];
const initialDepartmentsList: any[] = [];

const ObjectsContext = React.createContext({
  objectIds: initialObjectIdList,
  departments: initialDepartmentsList,
});

export default ObjectsContext;

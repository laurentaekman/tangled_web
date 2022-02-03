import React from "react";

const initialObjectIdList: number[] = [];
const initialObjectsWithImagesIdList: number[] = [];
const initialDepartmentsList: any[] = [];

const ObjectsContext = React.createContext({
  objectIds: initialObjectIdList,
  objectWithImagesIds: initialObjectsWithImagesIdList,
  departments: initialDepartmentsList,
});

export default ObjectsContext;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import ObjectsContext from "../context/objects-context";
import { useEffect, useState } from "react";
import { getArtObjectsWithImages } from "../utils/api";

function MyApp({ Component, pageProps }: AppProps) {
  const initialObjectIds: number[] = [];
  const [objectIds, setObjectIds] = useState(initialObjectIds);
  const [objectWithImagesIds, setObjectsWithImagesIds] =
    useState(initialObjectIds);
  const [departments, setDepartments] = useState(initialObjectIds);

  useEffect(() => {
    async function getObjectIds() {
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects"
      );
      const data = await response.json();
      const objectIds: number[] = data.objectIDs;

      setObjectIds(objectIds);
    }
    async function getObjectsWithImagesIds() {
      const response = await getArtObjectsWithImages();
      const data = response.objectIDs;
      setObjectsWithImagesIds(data);
    }
    async function getDepartments() {
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/departments"
      );
      const data = await response.json();
      const departments: any[] = data.departments;

      setDepartments(departments);
    }
    Promise.all([getObjectIds(), getObjectsWithImagesIds(), getDepartments()]);
  }, []);

  return (
    <ObjectsContext.Provider
      value={{ objectIds, objectWithImagesIds, departments }}
    >
      <Component {...pageProps} />
    </ObjectsContext.Provider>
  );
}

export default MyApp;

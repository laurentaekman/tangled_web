import "../styles/globals.css";
import type { AppProps } from "next/app";
import ObjectsContext from "../context/objects-context";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const initialObjectIDs: number[] = [];
  const [objectIDs, setObjectIDs] = useState(initialObjectIDs);
  const [departments, setDepartments] = useState(initialObjectIDs);

  useEffect(() => {
    async function getObjectIDs() {
      console.log("calling objectIDs for context!");
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects"
      );
      const data = await response.json();
      const objectIDs: number[] = data.objectIDs;

      setObjectIDs(objectIDs);
    }
    async function getDepartments() {
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/departments"
      );
      const data = await response.json();
      const departments: any[] = data.departments;

      setDepartments(departments);
    }
    getObjectIDs();
    getDepartments();
  }, []);

  return (
    <ObjectsContext.Provider value={{ objectIDs, departments }}>
      <Component {...pageProps} />
    </ObjectsContext.Provider>
  );
}

export default MyApp;

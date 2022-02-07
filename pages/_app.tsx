import "../styles/globals.css";
import type { AppProps } from "next/app";
import ObjectsContext from "../context/objects-context";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [objectIds, setObjectIds] = useState<number[]>([]);
  const [departments, setDepartments] = useState<number[]>([]);

  useEffect(() => {
    async function getObjectIds() {
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects"
      );
      const data = await response.json();
      const objectIds: number[] = data.objectIDs;

      setObjectIds(objectIds);
    }
    async function getDepartments() {
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/departments"
      );
      const data = await response.json();
      const departments: any[] = data.departments;

      setDepartments(departments);
    }
    Promise.all([getObjectIds(), getDepartments()]);
  }, []);

  return (
    <ObjectsContext.Provider value={{ objectIds, departments }}>
      <Component {...pageProps} />
    </ObjectsContext.Provider>
  );
}

export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import ObjectsContext from "../context/objects-context";
import { useEffect, useState } from "react";
import { getAllDepartments, getAllObjectIds } from "../utils/api";

function MyApp({ Component, pageProps }: AppProps) {
  const [objectIds, setObjectIds] = useState<number[]>([]);
  const [departments, setDepartments] = useState<number[]>([]);

  useEffect(() => {
    async function getObjectIds() {
      try {
        const objectIds = await getAllObjectIds();
        setObjectIds(objectIds);
      } catch (error) {
        console.log(error);
      }
    }
    async function getDepartments() {
      try {
        const departments = await getAllDepartments();
        setDepartments(departments);
      } catch (error) {
        console.log(error);
      }
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

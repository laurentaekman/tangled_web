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
      const objectIds = await getAllObjectIds();
      setObjectIds(objectIds);
    }
    async function getDepartments() {
      const departments = await getAllDepartments();
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

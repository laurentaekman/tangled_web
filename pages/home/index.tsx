import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import ArtObjectCard from "../../components/ArtObjectCard";
import ObjectsContext from "../../context/objects-context";
import Header from "../../components/Header";
import { getArtObjects } from "../../utils/api";

/*
TODO:
- Restrict options based on whether they have images or not
- Create better layout for initial options
*/
const Home: NextPage = () => {
  const initialObjectIdArray: number[] = [];
  const initialObjectArray: any[] = [];

  const [startingObjectIds, setStartingObjectIds] =
    useState(initialObjectIdArray);
  const [startingObjects, setStartingObjects] = useState(initialObjectArray);
  const [isLoading, setIsLoading] = useState(false);
  const objectsContext = useContext(ObjectsContext);

  useEffect(() => {
    setIsLoading(true);
    async function getRandomObjectIds() {
      const data = objectsContext.objectIds;
      const randomObjectIds: number[] = [];
      for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * (data.length - 0 + 1));
        randomObjectIds.push(data[randomIndex]);
      }
      setStartingObjectIds(randomObjectIds);
    }
    if (objectsContext.objectIds.length > 0) {
      getRandomObjectIds();
    }
  }, [objectsContext]);

  useEffect(() => {
    async function fetchArtObjects(objectIDs: number[]) {
      setIsLoading(true);
      const objects = await getArtObjects(objectIDs);
      setStartingObjects(objects);
      setIsLoading(false);
    }
    if (startingObjectIds.length > 0) {
      fetchArtObjects(startingObjectIds);
    } else {
      setIsLoading(true);
    }
  }, [startingObjectIds]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Tangled Web</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />
        <h2>Get started by clicking one of the art pieces below.</h2>
        {/* <div>
          Or click{" "}
          <Link href="/art-posts/436532">
            <a>this page!</a>
          </Link>
        </div> */}

        {startingObjects.length > 0 && startingObjectIds.length && !isLoading && (
          <div className={styles.cards}>
            {startingObjects.map((object) => {
              return <ArtObjectCard artObject={object} key={object.objectID} />;
            })}
          </div>
        )}
        {isLoading && <div className={styles.loader}></div>}
      </main>
    </div>
  );
};

export default Home;

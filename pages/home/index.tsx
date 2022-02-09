import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import ArtObjectCard from "../../components/ArtObjectCard";
import ObjectsContext from "../../context/objects-context";
import Header from "../../components/Header";
import { getArtObjects, getObjectsBySearch } from "../../utils/api";
import { ArtObject } from "../../utils/types";
import { useInfiniteScroll } from "../../hooks/use-infinite-scroll";
import { SearchBar } from "../../components/SearchBar";
import { UpArrowIcon } from "../../assets/UpArrowIcon";

/*
TODO:
- Make pagination loading less excessive (only load a FEW elements, rather than hundreds)
- Make loader less erratic when it displays at bottom of page
*/

const Home: NextPage = () => {
  const [artObjectIds, setArtObjectIds] = useState<number[]>([]);
  const [artObjects, setArtObjects] = useState<ArtObject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableIds, setAvailableIds] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [sendToTop, setSendToTop] = useState(false);

  const objectsContext = useContext(ObjectsContext);
  const contextObjectIds = objectsContext.objectIds;
  const itemsPerPage = 3;

  const options = {
    root: null,
    rootMargin: "200px",
    threshold: 0,
  };

  const handleNextPageCall = () => {
    // console.log("next page!");
    const nextEndIndex = (currentPage + 1) * itemsPerPage;
    setCurrentPage((prevPage) => prevPage + 1);

    if (artObjects.length < nextEndIndex) {
      const allObjectIds = availableIds.slice(0, nextEndIndex);
      setArtObjectIds(allObjectIds);
    }
  };

  const scrollRef = useInfiniteScroll(handleNextPageCall, options);

  //Change in available objects leads to automatic reset of items shown & page
  useEffect(() => {
    const startingObjectIds = availableIds.slice(0, 1 * itemsPerPage);
    const getStartingObjects = async () => {
      const newObjects = await getArtObjects(startingObjectIds);
      setArtObjects(newObjects);
    };

    if (availableIds.length > 0) {
      setIsLoading(true);
      setCurrentPage(1);
      setArtObjectIds(availableIds.slice(0, 1 * itemsPerPage));
      getStartingObjects();
      setIsLoading(false);
    }
  }, [availableIds]);

  //Change in search term determines what Ids are available
  useEffect(() => {
    const getSearchedAvailableIds = async () => {
      // console.log("grabbing new Ids based off term: ", searchTerm);
      const newIds = await getObjectsBySearch(searchTerm);
      setAvailableIds(newIds);
    };
    if (searchTerm) {
      getSearchedAvailableIds();
    } else {
      setAvailableIds(contextObjectIds);
    }
  }, [contextObjectIds, searchTerm]);

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage - itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const getNewArtObjects = async () => {
      setIsLoading(true);
      const newObjectIds = availableIds.slice(startIndex, endIndex);
      const newObjects: ArtObject[] = await getArtObjects(newObjectIds);
      setArtObjects((prevArray) => prevArray.concat(newObjects).sort());

      setIsLoading(false);
    };

    if (
      artObjectIds.length > 0 &&
      endIndex > artObjectIds.length &&
      endIndex < availableIds.length
    ) {
      getNewArtObjects();
    }
  }, [artObjectIds, availableIds, currentPage]);

  useEffect(() => {
    if (sendToTop) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      setSendToTop(false);
    }
  }, [sendToTop]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Art Crawl</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        {/* <html lang="en"></html> */}
      </Head>

      <main className={styles.main}>
        <Header />
        <h2>Get started by clicking one of the art pieces below.</h2>
        <div className={styles.search}>
          <div>Or search for something specific:</div>
          <SearchBar setSearchTerm={setSearchTerm} />
        </div>
        <div className={styles.home_content}>
          {artObjects.length > 0 && artObjectIds.length && (
            <div className={styles.cards}>
              {artObjects.length > 0 &&
                artObjects.map((object) => (
                  <ArtObjectCard artObject={object} key={object.id} />
                ))}
            </div>
          )}
          <button aria-label="return to top" onClick={() => setSendToTop(true)}>
            <UpArrowIcon />
          </button>
        </div>
      </main>
      {isLoading && <div className={styles.loader}></div>}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default Home;

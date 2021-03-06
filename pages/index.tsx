import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/pages/WelcomePage.module.css";
import { getArtObject } from "../utils/api";
import { ArtObject } from "../utils/types";
import { RightArrowIcon } from "../assets/RightArrowIcon";

const WelcomePage: NextPage = () => {
  const [defaultObject, setDefaultObject] = useState<ArtObject>();
  let triesToRetrieveObject = 1;

  //Grab default image to display as background on Welcome page
  useEffect(() => {
    let object: ArtObject | undefined;
    const getDefaultObject = async () => {
      triesToRetrieveObject++;
      try {
        object = await getArtObject(436121);
        setDefaultObject(object);
      } catch (error) {
        console.log("Couldn't fetch art objects.");
      }
    };

    if (!defaultObject && triesToRetrieveObject <= 3) {
      getDefaultObject();
    }
  }, [defaultObject]);

  return (
    <div>
      <Head>
        <title>Art Crawl</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div
          // Pass CSS styling and image URL inline here
          style={{
            backgroundImage: `url(${defaultObject?.imageSource})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minWidth: "100vw",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: `${styles.fade} 3s ease-in 1`,
          }}
        >
          <div className={styles.main_text}>
            <h1>Art Crawl</h1>
            <h2>
              Explore a variety of pieces at the Metropolitan Museum of Art.
            </h2>
            <Link href="/home">
              <a>
                Get Started
                <RightArrowIcon />
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;

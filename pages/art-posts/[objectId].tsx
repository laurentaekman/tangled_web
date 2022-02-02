/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import ArtDescription from "../../components/ArtDescription";
import Frame from "../../components/Frame";
import Header from "../../components/Header";
import artPostStyles from "../../styles/art-post.module.css";
import { APIArtObject, ArtObject, convertArtObject } from "../../utils/types";

export default function ArtPost() {
  const router = useRouter();
  const objectId = router.query.objectId;
  const [artObject, setArtObject] = useState<ArtObject>();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    height: 800,
    width: 768,
  });
  const frameDimensions = {
    height: imageDimensions.height + 200,
    width: imageDimensions.width + 200,
  };

  useEffect(() => {
    async function getArtObject() {
      if (objectId && objectId !== "undefined") {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
          );
          const output = await response.json();
          const artObject: APIArtObject = output;
          setArtObject(convertArtObject(artObject));
        } catch (error) {
          setError(error);
          console.log(error);
        }
        setIsLoading(false);
      }
    }
    getArtObject();
  }, [objectId]);

  useEffect(() => {
    const image = new Image();
    image.onload = function () {
      setImageDimensions({
        height: image.height / 1.25,
        width: image.width / 1.25,
      });
    };
    image.src = artObject?.imageSource ?? "";
  }, [artObject?.imageSource]);

  return (
    <div className={artPostStyles.art_post}>
      <Header />
      <div className={artPostStyles.post_items}>
        {artObject?.imageSource && (
          <Frame dimensions={frameDimensions}>
            <img
              src={artObject.imageSource}
              alt={artObject.title}
              height={imageDimensions.height}
              width={imageDimensions.width}
            />
          </Frame>
        )}
        {artObject && !isLoading && !error && (
          <div className={artPostStyles.description_info}>
            <ArtDescription
              objectTitle={artObject.title}
              artistName={artObject.artistName}
              artistNationality={artObject.artistNationality}
              artistBirthYear={artObject.artistBirthYear}
              artistDeathYear={artObject.artistDeathYear}
              objectBeginDate={artObject.objectBeginDate}
              objectEndDate={artObject.objectEndDate}
              medium={artObject.medium}
              dimensions={artObject.dimensions}
              department={artObject.department}
              objectName={artObject.objectName}
              objectId={artObject.id}
            />
          </div>
        )}
      </div>
      {isLoading && <div className={artPostStyles.loader}></div>}
      {error && <div>There was an error while retrieving data.</div>}
    </div>
  );
}

/*
export const getStaticProps = async (context) => {
  const objectId = context.params.objectId;
  if (objectId && objectId !== "undefined") {
    console.log(objectId);
    try {
      //Had to export this independently from ArtPost
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
        //"https://collectionapi.metmuseum.org/public/collection/v1/objects/446532"
      );
      const output = await response.json();
      const artObject: APIArtObject = output;
      //console.log(artObject);
      return { props: convertArtObject(artObject) }; //Had to nest the returned object within 'props' property
    } catch (error) {
      console.log(error);
    }
  }
  return { props: {} };
};

export const getStaticPaths = async () => {
  // let listOfObjectIDs: number[] = [];
  // try {
  //   const response = await fetch(
  //     "https://collectionapi.metmuseum.org/public/collection/v1/objects"
  //     //`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true`
  //   );
  //   const data = await response.json();
  //   listOfObjectIDs = data.objectIDs;
  // } catch (error) {
  //   console.log("paths", error);
  // }

  return {
    fallback: "blocking",
    // paths: [`/art-posts/436532`], //TODO: grab list of valid object IDs and use that for path
    paths: [{ params: { objectId: "436532" } }],
    //paths: listOfObjectIDs.map((objectID) => `/art-posts/${objectID}`),
  };
};
*/

import artPostStyles from "../styles/pages/art-post.module.css";
import Link from "next/link";
import { SearchTypes, findRelatedObject } from "../utils/api";
import { useContext, useEffect, useState } from "react";
import ObjectsContext from "../context/objects-context";
import { useFavorites } from "../hooks/use-favorites";
import { ArtObject } from "../utils/types";
import { HeartUnfilledIcon } from "../assets/HeartUnfilledIcon";
import { HeartFilledIcon } from "../assets/HeartFilledIcon";

interface Props {
  artObject: ArtObject;
}

export default function ArtDescription({ artObject }: Props) {
  const departments = useContext(ObjectsContext).departments;
  const objectDepartment = departments.find(
    (currentDepartment) =>
      currentDepartment.displayName === artObject.department
  );

  const [departmentHref, setDepartmentHref] = useState<string>("");
  const [artistHref, setArtistHref] = useState<string>("");
  const [dateHref, setDateHref] = useState<string>("");
  const [mediumHref, setMediumHref] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, addFavorite, removeFavorite] = useFavorites();

  const isFavorited = favorites.some(
    (favorite: ArtObject) => artObject.id === favorite.id
  );

  const createArtistBio = (
    name: string,
    nationality: string,
    birthYear: string,
    deathYear: string
  ) => {
    let response = "";
    if (name) {
      response = name;
    } else {
      response = "Artist unknown";
    }
    if (nationality && birthYear && deathYear) {
      response = response + ` (${nationality}, ${birthYear} - ${deathYear})`;
    } else if (nationality) {
      response = response + ` (${nationality})`;
    } else if (birthYear && deathYear) {
      response = response + ` (${birthYear} - ${deathYear})`;
    }
    return response;
  };

  const objectCreationDateRange = (beginDate: string, endDate: string) => {
    if (beginDate !== endDate) {
      return `${beginDate} to ${endDate}`;
    } else {
      return beginDate;
    }
  };

  const dataToRender = [
    {
      id: "artist",
      label: "Artist:",
      artInfo: createArtistBio(
        artObject.artistName,
        artObject.artistNationality,
        artObject.artistBirthYear,
        artObject.artistDeathYear
      ),
      linkHref: artistHref,
    },
    {
      id: "years-created",
      label: "Year(s) Created:",
      artInfo: objectCreationDateRange(
        artObject.objectBeginDate,
        artObject.objectEndDate
      ),
      linkHref: dateHref,
    },
    {
      id: "medium",
      label: "Medium:",
      artInfo: artObject.medium,
      linkHref: mediumHref,
    },
    {
      id: "dimensions",
      label: "Dimensions:",
      artInfo: artObject.dimensions,
    },
    {
      id: "department",
      label: "Department:",
      artInfo: artObject.department,
      linkHref: departmentHref,
    },
  ].filter((data) => {
    return !!data.artInfo || data.artInfo !== "";
  });

  useEffect(() => {
    async function getDepartmentPath() {
      setIsLoading(true);
      const newDepartmentObject = await findRelatedObject(
        SearchTypes.department,
        objectDepartment.departmentId,
        artObject.objectName,
        artObject.id
      );
      if (newDepartmentObject) {
        setDepartmentHref(`/art-posts/${newDepartmentObject}`);
      }
      setIsLoading(false);
    }
    if (objectDepartment && artObject.objectName) {
      getDepartmentPath();
    }
  }, [objectDepartment, artObject.objectName, artObject.id]);

  useEffect(() => {
    async function getArtistPath() {
      setIsLoading(true);
      const newArtistObject = await findRelatedObject(
        SearchTypes.artist,
        "true",
        artObject.artistName,
        artObject.id
      );
      if (newArtistObject) {
        setArtistHref(`/art-posts/${newArtistObject}`);
      }
      setIsLoading(false);
    }
    if (artObject.artistName) {
      getArtistPath();
    }
  }, [artObject.artistName, artObject.id]);

  useEffect(() => {
    async function getDatePath() {
      setIsLoading(true);
      const newDateObject = await findRelatedObject(
        SearchTypes.date,
        `${artObject.objectBeginDate ?? ""} ${
          artObject.objectEndDate ?? ""
        }`.trim(),
        artObject.objectName,
        artObject.id
      );

      if (newDateObject) {
        setDateHref(`/art-posts/${newDateObject}`);
      }
      setIsLoading(false);
    }
    if (artObject.objectBeginDate || artObject.objectEndDate) {
      getDatePath();
    }
  }, [
    artObject.objectBeginDate,
    artObject.objectEndDate,
    artObject.objectName,
    artObject.id,
  ]);

  useEffect(() => {
    async function getMediumPath() {
      setIsLoading(true);
      const searchTerm = artObject.medium.split(" ")[0].replace(/\W/g, "");
      const newMediumObject = await findRelatedObject(
        SearchTypes.medium,
        searchTerm,
        artObject.objectName,
        artObject.id
      );

      if (newMediumObject) {
        setMediumHref(`/art-posts/${newMediumObject}`);
      }
      setIsLoading(false);
    }
    if (artObject.medium) {
      getMediumPath();
    }
  }, [artObject.medium, artObject.objectName, artObject.id]);

  return (
    <div className={artPostStyles.description}>
      {!isFavorited && (
        <button onClick={() => addFavorite(artObject.id)}>
          <HeartUnfilledIcon />
          Favorite this post
        </button>
      )}
      {isFavorited && (
        <button onClick={() => removeFavorite(artObject.id)}>
          <HeartFilledIcon />
          Unfavorite this post
        </button>
      )}
      <h1>{artObject.title}</h1>
      {dataToRender.map((data) => {
        return (
          <div key={data.id}>
            <p>{data.label}</p>
            {data.linkHref && !isLoading && (
              <Link href={data.linkHref}>
                <a>{data.artInfo}</a>
              </Link>
            )}
            {!data.linkHref && !isLoading && <div>{data.artInfo}</div>}
            {isLoading && <div className={artPostStyles.small_loader}></div>}
          </div>
        );
      })}
    </div>
  );
}

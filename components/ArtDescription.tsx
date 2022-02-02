import artPostStyles from "../styles/art-post.module.css";
import Link from "next/link";
import { SearchTypes, searchAndGetObject } from "../utils/api";
import { useContext, useEffect, useState } from "react";
import ObjectsContext from "../context/objects-context";
import { useFavorites } from "../hooks/use-favorites";
import { ArtObject } from "../utils/types";
import { HeartUnfilledIcon } from "../assets/HeartUnfilledIcon";
import { HeartFilledIcon } from "../assets/HeartFilledIcon";

interface Props {
  objectTitle: string;
  artistName: string;
  artistNationality: string;
  artistBirthYear: string;
  artistDeathYear: string;
  objectBeginDate: string;
  objectEndDate: string;
  medium: string;
  dimensions: string;
  department: string;
  objectName: string;
  objectId: number;
}

export default function ArtDescription({
  objectTitle,
  artistName,
  artistNationality,
  artistBirthYear,
  artistDeathYear,
  objectBeginDate,
  objectEndDate,
  medium,
  dimensions,
  department,
  objectName,
  objectId,
}: Props) {
  const departments = useContext(ObjectsContext).departments;
  const objectDepartment = departments.find(
    (currentDepartment) => currentDepartment.displayName === department
  );

  const [departmentHref, setDepartmentHref] = useState<string>("");
  const [artistHref, setArtistHref] = useState<string>("");
  const [dateHref, setDateHref] = useState<string>("");
  const [mediumHref, setMediumHref] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, addFavorite, removeFavorite] = useFavorites();

  const isFavorited = favorites.some(
    (favorite: ArtObject) => objectId === favorite.id
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
        artistName,
        artistNationality,
        artistBirthYear,
        artistDeathYear
      ),
      linkHref: artistHref,
    },
    {
      id: "years-created",
      label: "Year(s) Created:",
      artInfo: objectCreationDateRange(objectBeginDate, objectEndDate),
      linkHref: dateHref,
    },
    {
      id: "medium",
      label: "Medium:",
      artInfo: medium,
      linkHref: mediumHref,
    },
    {
      id: "dimensions",
      label: "Dimensions:",
      artInfo: dimensions,
    },
    {
      id: "department",
      label: "Department:",
      artInfo: department,
      linkHref: departmentHref,
    },
  ].filter((data) => {
    return !!data.artInfo || data.artInfo !== "";
  });

  useEffect(() => {
    async function getDepartmentPath() {
      setIsLoading(true);
      const newDepartmentObject = await searchAndGetObject(
        SearchTypes.department,
        objectDepartment.departmentId,
        objectName,
        objectId.toString()
      );
      if (newDepartmentObject) {
        setDepartmentHref(`/art-posts/${newDepartmentObject}`);
      }
      setIsLoading(false);
    }
    if (objectDepartment && objectName) {
      getDepartmentPath();
    }
  }, [objectDepartment, objectName, objectId]);

  useEffect(() => {
    async function getArtistPath() {
      setIsLoading(true);
      const newArtistObject = await searchAndGetObject(
        SearchTypes.artist,
        "true",
        artistName,
        objectId.toString()
      );
      if (newArtistObject) {
        setArtistHref(`/art-posts/${newArtistObject}`);
      }
      setIsLoading(false);
    }
    if (artistName) {
      getArtistPath();
    }
  }, [artistName, objectId]);

  useEffect(() => {
    async function getDatePath() {
      setIsLoading(true);
      const newDateObject = await searchAndGetObject(
        SearchTypes.date,
        `${objectBeginDate ?? ""} ${objectEndDate ?? ""}`.trim(),
        objectName,
        objectId.toString()
      );

      //Tighten up date ranges when making requests
      if (newDateObject) {
        setDateHref(`/art-posts/${newDateObject}`);
      }
      setIsLoading(false);
    }
    if (objectBeginDate || objectEndDate) {
      getDatePath();
    }
  }, [objectBeginDate, objectEndDate, objectName, objectId]);

  useEffect(() => {
    async function getMediumPath() {
      setIsLoading(true);
      const searchTerm = medium.split(" ")[0].replace(/\W/g, "");
      const newMediumObject = await searchAndGetObject(
        SearchTypes.medium,
        searchTerm,
        objectName,
        objectId.toString()
      );

      if (newMediumObject) {
        setMediumHref(`/art-posts/${newMediumObject}`);
      }
      setIsLoading(false);
    }
    if (medium) {
      getMediumPath();
    }
  }, [medium, objectName, objectId]);

  return (
    <div className={artPostStyles.description}>
      {!isFavorited && (
        <button onClick={() => addFavorite(objectId)}>
          <HeartUnfilledIcon />
          Favorite this post
        </button>
      )}
      {isFavorited && (
        <button onClick={() => removeFavorite(objectId)}>
          <HeartFilledIcon />
          Unfavorite this post
        </button>
      )}
      <h1>{objectTitle}</h1>
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

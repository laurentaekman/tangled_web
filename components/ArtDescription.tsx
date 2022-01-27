import artPostStyles from "../styles/art-post.module.css";
import Link from "next/link";
import { SearchTypes, searchAndFetchObject } from "../utils/utils";
import { useContext, useEffect, useState } from "react";
import ObjectsContext from "../context/objects-context";

interface Props {
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
  objectId: string;
}

export default function ArtDescription({
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
      const newDepartmentObject = await searchAndFetchObject(
        SearchTypes.department,
        objectDepartment.departmentId,
        objectName,
        objectId
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
      const newArtistObject = await searchAndFetchObject(
        SearchTypes.artist,
        "true",
        artistName,
        objectId
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
      const newDateObject = await searchAndFetchObject(
        SearchTypes.date,
        `${objectBeginDate ?? ""} ${objectEndDate ?? ""}`.trim(),
        objectName,
        objectId
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
      const newMediumObject = await searchAndFetchObject(
        SearchTypes.medium,
        searchTerm,
        objectName,
        objectId
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

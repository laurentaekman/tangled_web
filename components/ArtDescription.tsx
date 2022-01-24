import artPostStyles from "../styles/art-post.module.css";
import Link from "next/link";
import { SearchTypes, generateHref } from "../utils/utils";
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
}: Props) {
  const departments = useContext(ObjectsContext).departments;
  const objectDepartment = departments.find(
    (currentDepartment) => currentDepartment.displayName === department
  );
  const [departmentHref, setDepartmentHref] = useState("");

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
    },
    {
      id: "years-created",
      label: "Year(s) Created:",
      artInfo: objectCreationDateRange(objectBeginDate, objectEndDate),
    },
    {
      id: "medium",
      label: "Medium:",
      artInfo: medium,
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
    //Acquire links for all necessary fields
    async function getDepartmentPath() {
      const departmentLink = await generateHref(
        SearchTypes.department,
        objectDepartment.departmentId,
        objectName
      );
      setDepartmentHref(departmentLink);
    }
    if (objectDepartment && objectName) {
      getDepartmentPath();
    }
  }, [objectDepartment, objectName]);

  return (
    <div className={artPostStyles.description}>
      {dataToRender.map((data) => {
        return (
          <div key={data.id}>
            <p>{data.label}</p>
            {data.linkHref && <Link href={data.linkHref}></Link>}
            {!data.linkHref && <p>{data.artInfo}</p>}
          </div>
        );
      })}
    </div>
  );
}

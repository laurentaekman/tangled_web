import artPostStyles from "../styles/art-post.module.css";

interface Props {
  id: string;
  artistName: string;
  artistNationality: string;
  artistBirthYear: string;
  artistDeathYear: string;
  objectBeginDate: string;
  objectEndDate: string;
  medium: string;
  dimensions: string;
  department: string;
}

export default function ArtDescription({
  id,
  artistName,
  artistNationality,
  artistBirthYear,
  artistDeathYear,
  objectBeginDate,
  objectEndDate,
  medium,
  dimensions,
  department,
}: Props) {
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
      return `${beginDate}-${endDate}`;
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
    },
  ].filter((data) => {
    return !!data.artInfo || data.artInfo !== "";
  });

  return (
    <div className={artPostStyles.description}>
      {dataToRender.map((data) => {
        return (
          <div key={data.id}>
            <p>{data.label}</p>
            {data.artInfo}
          </div>
        );
      })}
    </div>
  );
}

import { APIArtObject, ArtObject, convertArtObject } from "../utils/types";

export enum SearchTypes {
  artist = "artistOrCulture",
  department = "departmentId",
  medium = "medium",
  date = "dateBegin",
}

export const searchAndGetObject = async (
  searchType: SearchTypes,
  searchTerm: string,
  basicQuery: string,
  currentId: string
) => {
  try {
    let requestUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search`;

    if (searchType !== SearchTypes.date) {
      requestUrl = requestUrl + `?${searchType}=${searchTerm}&q=${basicQuery}`;
    } else {
      let queryParameters = `?`;
      const dates = searchTerm.split(" ");
      const start = dates[0];
      const end = dates[1];
      start ? (queryParameters += `dateBegin=${start}`) : "";
      end ? (queryParameters += `${start ? "&" : ""}dateEnd=${start}`) : "";

      requestUrl = requestUrl + `?${queryParameters}&q=${basicQuery}`;
    }

    const response = await fetch(requestUrl);
    const data = await response.json();
    const objectId = data.objectIDs.find((object: any) => object != currentId);
    if (!objectId) {
      throw new Error();
    }
    return objectId;
  } catch (error) {
    console.log("Couldn't fetch a new object!");
  }

  return null;
};

export const generateHref = async (
  searchType: SearchTypes,
  searchTerm: string,
  basicQuery: string,
  currentId: string
) => {
  let path = `/art-posts/`;
  let objectId = await searchAndGetObject(
    searchType,
    searchTerm,
    basicQuery,
    currentId
  );

  return path + objectId;
};

export const getArtObjects = async (objectIDs: number[]): Promise<any[]> => {
  const objectPromises = objectIDs.map(async (objectID) => {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    );
    const data = await response.json();
    return data;
  });
  const objects = await Promise.all(objectPromises);
  return objects;
};

export const getArtObject = async (objectId: number) => {
  if (objectId) {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
    );
    const output: APIArtObject = await response.json();
    const artObject: ArtObject = convertArtObject(output);
    return artObject ?? {};
  }
};

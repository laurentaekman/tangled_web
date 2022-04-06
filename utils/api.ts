import { APIArtObject, ArtObject, convertArtObject } from "../utils/types";

export enum SearchTypes {
  artist = "artistOrCulture",
  department = "departmentId",
  medium = "medium",
  date = "dateBegin",
}

//For finding one object based on data from another object
//Compares original object ID to ensure we don't return the same object!
export const findRelatedObject = async (
  searchType: SearchTypes,
  searchTerm: string,
  basicQuery: string,
  currentId: number
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
      console.log("Couldn't fetch a related object!");
    }
    return objectId;
  } catch (error) {
    console.log(error);
  }
};

//Function to generate href value based on original object's data
export const generateHref = async (
  searchType: SearchTypes,
  searchTerm: string,
  basicQuery: string,
  currentId: number
) => {
  let path = `/art-posts/`;
  let objectId = await findRelatedObject(
    searchType,
    searchTerm,
    basicQuery,
    currentId
  );

  return path + objectId;
};

//Retrieves list art object data for array of objects, based on provided IDs
export const getArtObjects = async (
  objectIDs: number[]
): Promise<ArtObject[]> => {
  const objectPromises = objectIDs.map(async (objectID) => {
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      );
      const data: APIArtObject = await response.json();
      return convertArtObject(data);
    } catch (error) {
      throw new Error("Couldn't fetch art objects!");
    }
  });
  const objects = await Promise.all(objectPromises);
  return objects;
};

//Finds one specific art object's data based on given ID
export const getArtObject = async (objectId: number) => {
  if (objectId) {
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
      );
      const output: APIArtObject = await response.json();
      const artObject: ArtObject = convertArtObject(output);
      return artObject ?? {};
    } catch (error) {
      throw new Error("Couldn't fetch art object!");
    }
  }
};

//Used for search functionality; finds all provided object IDs related to a given search term
export const getObjectsBySearch = async (searchTerm: string) => {
  try {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}`
    );
    const output = await response.json();
    return output.objectIDs;
  } catch (error) {
    throw new Error("Couldn't fetch art objects!");
  }
};

//Used upon initial application render; retrieves all available object IDs
export const getAllObjectIds = async () => {
  try {
    const response = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/objects",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const data = await response.json();
    const objectIds: number[] = data.objectIDs;
    return objectIds;
  } catch (error) {
    throw new Error("Couldn't fetch art objects!");
  }
};

//Used upon initial application render; retrieves all available departments
export const getAllDepartments = async () => {
  try {
    const response = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/departments"
    );
    const data = await response.json();
    const departments: number[] = data.departments;
    return departments;
  } catch (error) {
    throw new Error("Couldn't fetch art objects!");
  }
};

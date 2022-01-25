export enum SearchTypes {
  artist = "artistOrCulture",
  department = "departmentId",
  medium = "medium",
  date = "dateBegin",
}

export const searchAndFetchObject = async (
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
    const objectId = data.objectIDs.find((object: any) => object !== currentId);
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
  let objectId = await searchAndFetchObject(
    searchType,
    searchTerm,
    basicQuery,
    currentId
  );

  return path + objectId;
};

export enum SearchTypes {
  artist = "artistOrCulture",
  department = "departmentId",
  medium = "medium",
}

export const searchAndFetchObject = async (
  searchType: SearchTypes,
  searchTerm: string,
  basicQuery: string
) => {
  try {
    let requestUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search`;
    //Formatted specifically for department right now
    requestUrl = requestUrl + `?${searchType}=${searchTerm}&q=${basicQuery}`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    const objectId = data.objectIDs[0];
    return objectId;
  } catch (error) {
    console.log("Couldn't fetch a new object!");
  }
  return null;
};

export const generateHref = async (
  searchType: SearchTypes,
  searchTerm: string,
  basicQuery: string
) => {
  let path = `/art-posts/`;
  switch (searchType) {
    case "departmentId":
      const newObjectId = await searchAndFetchObject(
        searchType,
        searchTerm,
        basicQuery
      );
      path = path + newObjectId;
      break;
    default:
      console.log("There was no search query match.");
      break;
  }

  console.log(path);
  return path;
};

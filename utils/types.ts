export interface ArtObject {
  id: number;
  title: string;
  objectBeginDate: string;
  objectEndDate: string;
  department: string;
  artistName: string;
  artistNationality: string;
  artistBirthYear: string;
  artistDeathYear: string;
  medium: string;
  dimensions: string;
  imageSource: string;
  objectName: string;
}

export interface APIArtObject {
  objectID: number;
  title: string;
  department: string;
  objectBeginDate: string;
  objectEndDate: string;
  artistDisplayName: string;
  artistNationality: string;
  artistBeginDate: string;
  artistEndDate: string;
  medium: string;
  dimensions: string;
  primaryImageSmall: string;
  objectName: string;
}

export const convertArtObject = (apiObject: APIArtObject): ArtObject => {
  return {
    id: apiObject.objectID,
    title: apiObject.title ?? "",
    department: apiObject.department ?? "",
    objectBeginDate: apiObject.objectBeginDate ?? "",
    objectEndDate: apiObject.objectEndDate ?? "",
    artistName: apiObject.artistDisplayName ?? "",
    artistNationality: apiObject.artistNationality ?? "",
    artistBirthYear: apiObject.artistBeginDate ?? "",
    artistDeathYear: apiObject.artistEndDate ?? "",
    medium: apiObject.medium,
    dimensions: apiObject.dimensions,
    imageSource: apiObject.primaryImageSmall,
    objectName: apiObject.objectName,
  };
};

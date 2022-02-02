export const truncateString = (text: string, numOfWords: number) => {
  if (text.split(" ").length > numOfWords) {
    //Filter for odd characters on last element? .replace(/\W/g, "")
    return text.split(" ").slice(0, numOfWords).join(" ") + "...";
  }
  return text;
};

import { Multimedia, MultimediaSubtype } from "../types/types";

export const getImage = (
  multimedia: Multimedia[],
  subType: MultimediaSubtype
): string | undefined => {
  //@ts-ignore
  const imgUrl: string | undefined = multimedia.find(
    (item) => item.type === "image" && item.subType === subType
  ).url;

  return `https://nyt.com/${imgUrl}`;
};

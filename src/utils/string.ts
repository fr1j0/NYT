export const cleanSectionName = (section: string) => {
  return section.split(" ").join("").split(".").join("");
};

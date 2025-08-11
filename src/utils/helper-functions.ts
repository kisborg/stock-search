export const stripNumberingFromKeys = (obj: { [key: string]: string }) => {
  const newObj: { [key: string]: string } = {};
  for (const key in obj) {
    // Remove leading number and dot-space using regex
    const newKey = key.replace(/^\d+\.\s*/, '');
    newObj[newKey] = obj[key];
  }
  return newObj;
};

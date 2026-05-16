export const truncateText = (str, maxLen) => {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + '...';
};

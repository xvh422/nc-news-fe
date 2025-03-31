function convertTimestampToDate(timestamp) {
  const splitDate = timestamp.split("T")[0].split("-");
  return splitDate.reverse().join("/");
}

function capitaliseFirstLetter(str) {
  const firstLetter = str[0];
  const otherLetters = str.toLowerCase().slice(1);
  return firstLetter.toUpperCase() + otherLetters;
}

export { convertTimestampToDate, capitaliseFirstLetter };

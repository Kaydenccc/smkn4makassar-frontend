export function convertUrlParameterFormat(urlParameterString) {
  // Replace '%20' with ' ' (space character) using decodeURIComponent
  const decodedString = decodeURIComponent(urlParameterString);

  // Return the decoded string
  return decodedString;
}

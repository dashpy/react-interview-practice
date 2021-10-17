export default async function getInformation(URL) {
  const response = await fetch(URL);
  const jsonData = await response.json();

  return jsonData;
}

import jsonData from "./data.json"
const data = jsonData

export function getProjectById(_id, lang) {
  const index = data[lang].findIndex((p) => p.id == _id)
  return index != -1 ? data[lang][index] : null
}

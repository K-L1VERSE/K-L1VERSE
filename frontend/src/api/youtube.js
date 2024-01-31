import axios from "./axios";

const gateway = "match";
const url = "youtubes";

export async function getSavedAt(success, fail) {
  await axios.get(`/${gateway}/${url}`).then(success).catch(fail);
}

export async function getYoutubeList(success, fail) {
  await axios.get(`/${gateway}/${url}/list`).then(success).catch(fail);
}

export async function postYoutube(param, success, fail) {
  await axios.post(`/${gateway}/${url}`, param).then(success).catch(fail);
}

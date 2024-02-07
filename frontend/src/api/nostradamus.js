import axios from "./axios";

const gateway = "user";
const url = "nostradamus";

export async function getNostradamus(success, fail) {
  await axios.get(`/${gateway}/${url}`).then(success).catch(fail);
}

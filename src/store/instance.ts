import axios, { AxiosInstance } from "axios";
import { atom } from "jotai";
import { getRandom } from "utils";

const instancesUrl = "https://api.invidious.io/instances.json";

export const instancesAtom = atom(async () => {
  const response = await axios.get<Instance[]>(instancesUrl);
  const instances = response.data;
  const filtered = instances.filter(
    ([_, instance]) => instance.api && instance.uri
  );
  return filtered;
});

export const instanceAtom = atom<AxiosInstance>((get) => {
  const instances = get(instancesAtom);
  const [_name, instance] = getRandom(instances);
  return axios.create({
    baseURL: instance.uri,
  });
});

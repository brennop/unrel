import axios, { AxiosInstance } from "axios"
import { atom } from "jotai"
import { getRandom } from "utils";

export const instancesAtom = atom<Instance[]>([]);

export const instanceAtom = atom<AxiosInstance>(
  get => {
    const instances = get(instancesAtom)
    const [_name, instance] = getRandom(instances);
    console.log(_name)
    return axios.create({
      baseURL: instance.uri,
    })
  }
)

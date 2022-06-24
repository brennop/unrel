export const getRandom = <T>(data: Array<T>): T => {
  return data[Math.floor(Math.random() * data.length)];
}

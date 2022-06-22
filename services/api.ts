import axios from "axios";

export const instanceUrl = "https://inv.riverside.rocks";

const instance = axios.create({
  baseURL: instanceUrl,
});

export const getTrending = () =>
  instance
    .get<VideoItem[]>(
      `api/v1/trending?type=Music&fields=title,author,videoId,lengthSeconds,publishedText,videoThumbnails`
    )
    .then((response) => response.data)

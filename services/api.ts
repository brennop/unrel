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
    .then((response) => response.data);

export const searchVideos = (query: string) =>
  instance
    .get(
      `api/v1/search?q=${query}&type=video&fields=title,author,videoId,lengthSeconds,publishedText,videoThumbnails`
    )
    .then((response) => response.data);

export const getRecommended = (videoId: string): Promise<VideoItem[]> =>
  instance
    .get(`api/v1/videos/${videoId}?fields=recommendedVideos`)
    .then((response) => response.data.recommendedVideos);

export const getTrending = () => `api/v1/trending?type=Music&fields=title,author,videoId,lengthSeconds,publishedText,videoThumbnails`

export const searchVideos = (query: string) =>
  `api/v1/search?q=${query}&type=video&fields=title,author,videoId,lengthSeconds,publishedText,videoThumbnails`

export const getRecommended = (videoId: string) =>
  `api/v1/videos/${videoId}?fields=recommendedVideos`

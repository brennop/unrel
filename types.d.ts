type VideoItem = {
  title: string;
  author: string;
  videoId: string;
  lengthSeconds: string;
  publishedText: string;
};

type State = "none" | "loading" | "playing" | "paused" | "error";

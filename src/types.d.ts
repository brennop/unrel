type VideoItem = {
  title: string;
  author: string;
  videoId: string;
  lengthSeconds: string;
  publishedText: string;
};

type State = "none" | "loading" | "playing" | "paused" | "error";

type Instance = [
  string,
  {
    flag: string;
    region: string;
    stats: {
      version: string;
      software: {
        name: string;
        version: string;
        branch: string;
      };
      openRegistrations: boolean;
      usage: {
        users: {
          total: number;
          activeHalfyear: number;
          activeMonth: number;
        };
      };
      metadata: {
        updatedAt: number;
        lastChannelRefreshedAt: number;
      };
    };
    cors: boolean;
    api: boolean;
    type: "https" | "onion";
    uri: string;
    monitor: {
      monitorId: number;
      createdAt: number;
      statusClass: string;
      name: string;
      url: null;
      type: unknown;
      dailyRatios: {
        ratio: string;
        label: string;
      }[];
      "90dRatio": {
        ratio: string;
        label: string;
      };
      "30dRatio": {
        ratio: string;
        label: string;
      };
    };
  }
];

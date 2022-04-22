<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios'

const instanceUrl = "https://inv.riverside.rocks"

const instance = axios.create({
  baseURL: instanceUrl,
})

type SearchResult = {
  title: string;
  author: string;
  videoId: string;
}

type VideoItem = {
  title: string,
  videoId: string,
  author: string,
  adaptiveFormats: {
    url: string,
    type: string,
  }[],
}

const player = ref<HTMLAudioElement>(null!);

const query = ref("");
const data = ref<SearchResult[]>([]);
const loading = ref(false);

const current = ref({
  url: "",
  fallback: "",
  title: "",
  author: "",
});

function handleSearch() {
  loading.value = true
  instance.get(`api/v1/search?q=${query.value}&fields=title,author,videoId`)
    .then(response => data.value = response.data)
    .finally(() => loading.value = false)
}

function handleSelect(videoId: string) {
  instance.get<VideoItem>(`/api/v1/videos/${videoId}?fields=videoId,title,author,adaptiveFormats`)
    .then(response => {
      const data = response.data
      const stream = data.adaptiveFormats.find(video => video.type.includes("audio/webm"));
      if (stream) {
        const urlObject = new URL(stream.url);
        current.value = {
          url: stream.url,
          fallback: instanceUrl + urlObject.pathname + "?" + urlObject.searchParams,
          title: data.title,
          author: data.author,
        }
        player.value.load()
      }
    })
}

</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="border-slate-200 border-b">
      <form class="m-4 bg-slate-100 h-10 rounded-lg" @submit.prevent="handleSearch">
        <input class="bg-transparent p-2 outline-none w-full" v-model="query" />
      </form>
    </div>
    <div v-if="loading">loading...</div>
    <ul class="overflow-y-auto flex-1">
      <li v-for="item in data" class="px-6 py-2 border-b border-slate-200 flex
        flex-col hover:bg-gray-50 cursor-default" @click="handleSelect(item.videoId)">
        <span class="font-medium text-gray-900 truncate">{{ item.title }}</span>
        <span class="font-light text-gray-700">{{ item.author }}</span>
      </li>
    </ul>
    <div class="absolute bottom-0 inset-x-0 p-4 text-lg flex flex-col border-t border-slate-200 bg-gray-200/80 rounded-t-lg backdrop-blur-sm">
      <span class="font-medium text-gray-900 truncate">{{ current.title }}</span>
      <span class="font-light text-gray-700">{{ current.author }}</span>
      <audio controls autoplay ref="player" class="w-full mt-4">
        <source :src="current.url" />
        <source :src="current.fallback" />
      </audio>
    </div>
  </div>
</template>

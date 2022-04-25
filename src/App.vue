<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";

const instanceUrl = "https://inv.riverside.rocks";

const instance = axios.create({
  baseURL: instanceUrl,
});

type VideoItem = {
  title: string;
  author: string;
  videoId: string;
  lengthSeconds: string;
  publishedText: string;
};

const player = ref<HTMLAudioElement>(null!);

const query = ref("");
const data = ref<VideoItem[]>([]);
const loading = ref(false);

const current = ref<VideoItem>();

function handleSearch() {
  loading.value = true;
  instance
    .get(
      `api/v1/search?q=${query.value}&type=video&fields=title,author,videoId,lengthSeconds,publishedText`
    )
    .then((response) => (data.value = response.data))
    .finally(() => (loading.value = false));
}

watch(current, () => player.value.load());

function handleError() {
  console.log("")
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
      <li v-for="item in data" :key="item.videoId" class="border-b border-slate-200 hover:bg-gray-50 cursor-default">
        <button @click="current = item" class="flex items-center w-full px-6 py-2">
          <img :src="`${instanceUrl}/vi/${item.videoId}/mqdefault.jpg`" class="w-24 h-14 rounded-lg object-cover " />
          <div class="flex flex-col items-start ml-4 flex-1 w-0">
            <span class="font-semibold text-gray-900 text-left">{{ item.title }}</span>
            <span class="font-normal text-gray-700">{{ item.author }}</span>
            <span class="font-light text-sm text-gray-600">{{ item.publishedText }}</span>
          </div>
        </button>
      </li>
    </ul>
    <div class="p-4 text-lg flex flex-col border-t border-slate-200 bg-gray-200 rounded-t-lg">
      <div class="flex items-center" v-if="current">
        <img :src="`${instanceUrl}/vi/${current.videoId}/mqdefault.jpg`" class="w-28 h-16 rounded-lg object-cover " />
        <div class="flex flex-col ml-4 flex-1 w-0">
          <span class="font-medium text-gray-900 truncate">{{ current.title }}</span>
          <span class="font-normal text-gray-700">{{ current.author }}</span>
        </div>
      </div>
      <audio controls autoplay ref="player" class="w-full mt-4">
        <template v-if="current">
          <source 
            @error="handleError"
            :src="`${instanceUrl}/latest_version?id=${current.videoId}&itag=139`"
            type='audio/mp4; codecs="mp4a.40.5"' label="50281k" />
          <source :src="`${instanceUrl}/latest_version?id=${current.videoId}&itag=140`"
            type='audio/mp4; codecs="mp4a.40.2"' label="130708k" />
          <source :src="`${instanceUrl}/latest_version?id=${current.videoId}&itag=249`" type='audio/webm; codecs="opus"'
            label="54870k" />
          <source :src="`${instanceUrl}/latest_version?id=${current.videoId}&itag=250`" type='audio/webm; codecs="opus"'
            label="70731k" />
          <source :src="`${instanceUrl}/latest_version?id=${current.videoId}&itag=251`" type='audio/webm; codecs="opus"'
            label="136432k" />
        </template>
      </audio>
    </div>
  </div>
</template>
